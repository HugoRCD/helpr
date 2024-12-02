import { User } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { AES, enc } from "crypto-js";
import * as process from "process";

export const formatUser = (user: User): User => {
  delete user.password;
  delete user.refreshToken;
  return user;
};

export const generateCode = async (): Promise<string> => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const hash = async (ToHash: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(ToHash, saltRounds);
};

export const compare = async (
  ToDeHash: string,
  Hash: string,
): Promise<boolean> => {
  return bcrypt.compare(ToDeHash, Hash);
};

export function encrypt(toEncrypt) {
  const secretKey = process.env.AUTH_TOKEN_SECRET;
  return AES.encrypt(toEncrypt, secretKey).toString();
}

export function decrypt(toDecrypt) {
  const secretKey = process.env.AUTH_TOKEN_SECRET;
  const bytes = AES.decrypt(toDecrypt, secretKey);
  return bytes.toString(enc.Utf8);
}
