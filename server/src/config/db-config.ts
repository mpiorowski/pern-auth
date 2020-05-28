// knex setting
import { env } from "./app-config";
import knex from "knex";
import connection from "../../knexfile";
const configOptions = connection[env];
export = knex(configOptions);
