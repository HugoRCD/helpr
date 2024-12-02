import { prisma } from "../../../seed";

export async function postMessageAction(providerId: number) {
  return await prisma.action.create({
    data: {
      title: "Post Message",
      description: "Post a message to a channel in Slack",
      endpoint: "slack",
      name: "post-message",
      providerId: providerId,
      variables: {
        create: [
          {
            title: "Post message channel ID",
            key: "slack_message_channel",
            value: "{slack_message_channel}",
            required: true,
          },
          {
            title: "Post message text",
            key: "slack_message_text",
            value: "{slack_message_text}",
            type: "textarea",
            required: true,
          },
        ],
      },
    },
  });
}

export async function createChannelAction(providerId: number) {
  return await prisma.action.create({
    data: {
      title: "Create Channel",
      description: "Create a channel in Slack",
      endpoint: "slack",
      name: "create-channel",
      providerId: providerId,
      variables: {
        create: [
          {
            title: "Create channel name",
            key: "slack_channel_name",
            value: "{slack_channel_name}",
            required: true,
          },
          {
            title: "Create channel privacy",
            key: "slack_channel_privacy",
            value: "{slack_channel_privacy}",
            type: "boolean",
            required: false,
          },
        ],
      },
    },
  });
}
