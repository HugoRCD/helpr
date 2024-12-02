import { Role } from '~~/enums/Role'

export type User = {
  id: number;
  email: string;
  username?: string;
  firstname?: string;
  lastname?: string;
  avatar: string;
  magicLink?: string;
  isVerified: boolean;
  cover: string;
  bio: string;
  role: Role;
  createdAt: Date;
  updatedAt?: Date;
};

export type publicUser = {
  id: number;
  email: string;
  username?: string;
  firstname?: string;
  lastname?: string;
  avatar: string;
  role: Role;
  createdAt: Date;
  updatedAt?: Date;
};
