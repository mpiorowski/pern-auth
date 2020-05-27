import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("sys-users", function (table) {
    table.increments().primary();
    table.text("uuid").unique().defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("userName").notNullable();
    table.string("userEmail").notNullable();
    table.string("userPassword").notNullable();
    table.string("userRole").notNullable();
    table.boolean("isActive").notNullable().defaultTo(true);
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
    table.timestamp("deletedAt");
  });
}

export async function down(knex: Knex): Promise<any> {}
