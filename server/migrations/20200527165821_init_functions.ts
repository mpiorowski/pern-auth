import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.raw("CREATE EXTENSION IF NOT EXISTS pgcrypto; CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";");
}


export async function down(knex: Knex): Promise<any> {
}

