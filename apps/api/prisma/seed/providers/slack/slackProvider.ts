import { prisma } from "../../../seed";
import { createChannelAction, postMessageAction } from "./slackActions";

export async function createSlackProvider() {
  const provider = await prisma.provider.create({
    data: {
      name: "Slack",
      description: "Send messages, create channels, and more in Slack.",
      logo: "slack-logo",
    },
  });
  // Action
  await postMessageAction(provider.id);
  await createChannelAction(provider.id);
}
