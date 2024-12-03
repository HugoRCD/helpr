type Payload = {
  [key: string]: string;
}

export type createActionInput = {
  id: number;
  payload: Action;
}

export type flowBuilderData = {
  id: number;
  name: string;
  description: string;
  logo: string;
  actions: Action[];
  triggers: Trigger[];
}

export type Action = {
  index: number;
  id: number;
  title: string;
  description?: string;
  endpoint: string;
  name: string;
  providerId?: number;
  variables: Variable[];
  payload?: Payload;
}

type Variable = {
  id: number;
  title: string;
  name: string;
  value: string;
  actionId?: number;
  triggerId?: number;
  webhook?: boolean;
  premium?: boolean;
  type?: string;
  required: boolean;
}

export type Trigger = {
  id: number;
  provider: string;
  name: string;
  description: string;
  value: string;
  providerId: number;
  webhook: boolean;
  variables: Variable[];
}
