import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("sys_tokens", function (table) {
    table.increments().primary();
    table.text("uuid").unique().defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("token").notNullable();
    table.string("type").notNullable();
    table.string("email").notNullable();
    table.timestamp("expire").notNullable();
    table.boolean("isActive").notNullable().defaultTo(true);
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
    table.timestamp("deletedAt");
  });
}

export async function down(knex: Knex): Promise<any> {}
