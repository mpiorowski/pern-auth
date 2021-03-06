import knex from "../config/db-config";

export interface SysUser {
  id?: number;
  uuid?: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  userRole: string;
  createdAt?: string;
  editedAt?: string;
}

export const getUserByUserNameOrEmail = (userNameOrEmail: string) => {
  return knex<SysUser>("sys_users")
    .where(function () {
      this.where("userName", userNameOrEmail).orWhere("userEmail", userNameOrEmail);
    })
    .where("isActive", true)
    .whereNull("deletedAt");
};

export const getUserByUserName = (userName: string) => {
  return knex<SysUser>("sys_users").where("userName", userName).where("isActive", true);
  // .whereNull("deletedAt");
};

export const getUserByUserEmail = (userEmail: string) => {
  return knex<SysUser>("sys_users").where("userEmail", userEmail).where("isActive", true);
  // .whereNull("deletedAt");
};

export const getUserByUuid = (uuid: string) => {
  return knex<SysUser>("sys_users").where("uuid", uuid).where("isActive", true).whereNull("deletedAt");
};

export const getUserById = (id: number) => {
  return knex<SysUser>("sys_users").where("id", id).where("isActive", true).whereNull("deletedAt");
};

export const createUser = (user: SysUser) => {
  return knex<SysUser>("sys_users").insert(user).returning("*");
};

export const updatePassword = (userEmail: string, userPassword: string) => {
  return knex<SysUser>("sys_users").update("userPassword", userPassword).where("userEmail", userEmail);
};
