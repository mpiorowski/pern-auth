import * as Knex from "knex";
import bcrypt from "bcrypt";
import { saltRounds } from "../src/config/app-config";

export async function seed(knex: Knex): Promise<any> {
  return knex("sys_users")
    .del()
    .then(() => {
      const hash = bcrypt.hashSync("pass", saltRounds);
      // Inserts seed entries
      return knex("sys_users").insert([
        {
          userName: "admin",
          userEmail: "admin@gmail.com",
          userPassword: hash,
          userRole: "ROLE_ADMIN",
        },
        {
          userName: "user",
          userEmail: "user@gmail.com",
          userPassword: hash,
          userRole: "ROLE_USER",
        },
      ]);
    });
}
