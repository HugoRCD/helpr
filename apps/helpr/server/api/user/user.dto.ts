export type createUserInput = {
  username: string;
  password: string;
  email: string;
  avatar?: string;
  cover?: string;
  role?: number;
}

export type updateUserInput = {
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
