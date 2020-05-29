import * as Knex from "knex";
import bcrypt from "bcrypt";
const saltRounds = 10;

export async function seed(knex: Knex): Promise<any> {
  return knex("sys-users")
    .del()
    .then(() => {
      const hash = bcrypt.hashSync("pass", saltRounds);
      // Inserts seed entries
      return knex("sys-users").insert([
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
