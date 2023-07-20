export interface createUserInput {
  username: string;
  password: string;
  email: string;
  avatar?: string;
  cover?: string;
  role?: number;
}

export interface updateUserInput {
  username?: string;
  firstname?: string;
  lastname?: string;
  bio?: string;
  password?: string;
  email?: string;
  avatar?: string;
  cover?: string;
  role?: number;
}
