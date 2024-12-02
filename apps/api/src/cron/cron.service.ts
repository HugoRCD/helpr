import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ProviderService } from "../provider/provider.service";
import { FlowService } from "../flow/flow.service";
import { FlowVariable, Payload, Status, Trigger } from "../flow/flow.type";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CronService {
  constructor(
    private readonly providerService: ProviderService,
    private readonly flowService: FlowService,
    private readonly configService: ConfigService,
  ) {}

  replaceVariables(variables: FlowVariable[], payload: Payload) {
    for (const variable of variables) {
      for (const key in payload) {
        if (
          typeof payload[key] === "string" &&
          payload[key].includes(`{${variable.key}}`)
        ) {
          payload[key] = payload[key].replace(
            `{${variable.key}}`,
            variable.value,
          );
        }
      }
    }
    return payload;
  }

  async runFlow(flows) {
    for (const flow of flows) {
      try {
        console.log("Running flow: ", flow.name);
        await this.flowService.updateFlowStatus(flow.id, Status.RUNNING);
        let variables = [];
        const { data: flowVariables } = await this.flowService.getFlowData(
          flow.id,
        );
        if (flowVariables.length > 0) {
          variables = [...flowVariables];
        }
        const accessToken = flow.accessToken;
        for (const flowActions of flow.actions) {
          console.log("Running action: ", flowActions.action.name);
          const endpoint = flowActions.action.endpoint;
          const name = flowActions.action.name;
          const payload = JSON.parse(flowActions.payload);
          const payloadWithVariables = await this.replaceVariables(
            variables,
            payload,
          );
          const apiUrl = this.configService.get("api_url");
          const response = await fetch(`${apiUrl}/${endpoint}/${name}`, {
            method: "POST",
            body: JSON.stringify(payloadWithVariables),
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
          });
          const { data, message, statusCode } = await response.json();
          console.log(
            flowActions.action.name + " " + message + ":",
            statusCode,
          );
          if (data && data.variables && data.variables.length > 0) {
            variables = [...variables, ...data.variables];
          }
        }
        await this.flowService.updateFlowStatus(flow.id, Status.STANDBY);
      } catch (error) {
        console.log("Error: ", error);
        await this.flowService.updateFlowStatus(flow.id, Status.STANDBY);
      }
    }
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async runProviderTriggerFlow() {
    const { data: flows } = await this.flowService.getTriggerFlows();
    if (flows.length === 0) {
      console.log("Flow runner [Trigger Flow]: No flow to run");
    }
    await this.runFlow(flows);
  }

  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  async runDailyFlow() {
    const { data: flows } = await this.flowService.getFlowsToRun(
      Trigger.EVERY_DAY,
    );
    if (flows.length === 0) {
      console.log("Flow runner [Daily Flow]: No flow to run");
    }
    await this.runFlow(flows);
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async runEvery10MinutesFlow() {
    const { data: flows } = await this.flowService.getFlowsToRun(
      Trigger.EVERY_10_MINUTES,
    );
    if (flows.length === 0) {
      console.log("Flow runner [Every 10 Minutes Flow]: No flow to run");
    }
    await this.runFlow(flows);
  }

  @Cron(CronExpression.EVERY_HOUR)
  async runEvery1HourFlow() {
    const { data: flows } = await this.flowService.getFlowsToRun(
      Trigger.EVERY_1_HOUR,
    );
    if (flows.length === 0) {
      console.log("Flow runner [Every 1 Hour Flow]: No flow to run");
    }
    await this.runFlow(flows);
  }

  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  async setToReadyEveryDayFlows() {
    const { data: flows } = await this.flowService.getFlowsToTriggerCron(
      Trigger.EVERY_DAY,
    );
    for (const flow of flows) {
      await this.flowService.updateFlowStatus(flow.id, Status.READY);
    }
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async setToReadyEvery10MinutesFlows() {
    const { data: flows } = await this.flowService.getFlowsToTriggerCron(
      Trigger.EVERY_10_MINUTES,
    );
    for (const flow of flows) {
      await this.flowService.updateFlowStatus(flow.id, Status.READY);
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  async setToReadyEvery1HourFlows() {
    const { data: flows } = await this.flowService.getFlowsToTriggerCron(
      Trigger.EVERY_1_HOUR,
    );
    for (const flow of flows) {
      await this.flowService.updateFlowStatus(flow.id, Status.READY);
    }
  }
}
