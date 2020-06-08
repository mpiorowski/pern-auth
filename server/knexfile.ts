// Update with your config settings.
import { dbCredential } from "./src/config/app-config";

const connection: { [k: string]: any } = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      port: dbCredential.dev.port,
      database: dbCredential.dev.database,
      user: dbCredential.dev.user,
      password: dbCredential.dev.password,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    pool: { min: 0, max: 7 },
  },

  production: {
    client: "pg",
    connection: {
      host: "localhost",
      port: dbCredential.prod.port,
      database: dbCredential.prod.database,
      user: dbCredential.prod.user,
      password: dbCredential.prod.password,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    pool: { min: 0, max: 7 },
  },
};

export = connection;
