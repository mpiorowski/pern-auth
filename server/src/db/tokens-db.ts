import knex from "../config/db-config";
import { SysUser } from "./users-db";

export interface Token {
  id?: number;
  uuid?: string;
  data: {
    code: number;
    user: SysUser;
  };
  type: string;
  email: string;
  expire: string;
  createdAt?: string;
  editedAt?: string;
}

export const createAuthToken = (token: Token) => {
  return knex<Token>("sys_tokens").insert(token).returning("*");
};

export const findTokenByEmail = (email: string) => {
  return knex<Token>("sys_tokens")
    .where("email", email)
    .orderBy("createdAt", "desc")
    .limit(1);
};
