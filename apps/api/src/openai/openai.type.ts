export type createCompletionInput = {
  openai_model: number;
  openai_prompt: string;
  openai_max_tokens: number;
};

export enum Model {
  DaVinci = 1,
  GPT_TURBO = 2,
}
