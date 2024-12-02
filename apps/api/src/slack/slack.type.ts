export type createChannelInput = {
  slack_channel_name: string;
  slack_channel_privacy: boolean;
};

export type postMessageInput = {
  slack_message_channel: string;
  slack_message_text: string;
};
