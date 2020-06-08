import knex from "../../config/db-config";

export interface SysUsers {
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
  return knex<SysUsers>("sys-users")
    .where(function () {
      this.where("userName", userNameOrEmail).orWhere(
        "userEmail",
        userNameOrEmail
      );
    })
    .where("isActive", true)
    .whereNull("deletedAt");
};

export const getUserByUserName = (userName: string) => {
  return knex<SysUsers>("sys-users")
    .where("userName", userName)
    .where("isActive", true);
  // .whereNull("deletedAt");
};

export const getUserByUserEmail = (userEmail: string) => {
  return knex<SysUsers>("sys-users")
    .where("userEmail", userEmail)
    .where("isActive", true);
  // .whereNull("deletedAt");
};

export const getUserByUuid = (uuid: string) => {
  return knex<SysUsers>("sys-users")
    .where("uuid", uuid)
    .where("isActive", true)
    .whereNull("deletedAt");
};

export const getUserById = (id: number) => {
  return knex<SysUsers>("sys-users")
    .where("id", id)
    .where("isActive", true)
    .whereNull("deletedAt");
};

export const createUser = (user: SysUsers) => {
  return knex<SysUsers>("sys-users").insert(user).returning("*");
};
