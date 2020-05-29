import knex from "../../config/db-config";

export interface SysUsers {
  id: number;
  uuid: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  userRole: string;
  createdAt: string;
  editedAt: string;
}

export const getUserByUserName = (userName: string) => {
  return knex<SysUsers>("sys-users")
    .where("userName", userName)
    .where("isActive", true)
    .whereNull("deletedAt");
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
