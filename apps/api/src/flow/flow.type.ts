import { Flow } from '@prisma/client'

type createActionInput = {
  id: number;
  index: number;
  name: string;
  payload: string;
};

type updateActionInput = {
  id: number;
  index: number;
  name: string;
  payload: string;
};

export type createFlowInput = Flow & {
  actions: createActionInput[];
};

export type updateFlowInput = Flow & {
  actions: updateActionInput[];
};

export type webhookDataInput = {
  userId: number;
  provider: string;
  type: string;
  data: string;
};

export enum Trigger {
  EVERY_10_MINUTES = 'every_10_minutes',
  EVERY_1_HOUR = 'every_1_hour',
  EVERY_DAY = 'every_day',
  TICKET_CREATED = 'ticket-created',
  PROJECT_CREATED = 'project-created',
  ISSUE_CREATED = 'issue-created',
  PULL_REQUEST_CREATED = 'pull-request-created',
  CUSTOMER_CREATED = 'customer-created',
  PAYMENT_CREATED = 'payment-created',
  PRODUCT_CREATED = 'product-created',
}

export enum Status {
  STANDBY = 1,
  READY = 2,
  RUNNING = 3,
}

export type FlowVariable = {
  key: string;
  value: string;
};

export type Payload = {
  [key: string]: string;
};
