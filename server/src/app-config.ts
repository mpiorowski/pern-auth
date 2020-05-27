const env = process.env.NODE_ENV || "development";

// knex setting
import knex from "knex";
import connection from "../knexfile";
const configOptions = connection[env];
export = knex(configOptions);
