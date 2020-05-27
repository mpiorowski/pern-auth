// Update with your config settings.

const connection: { [k: string]: any } = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5432,
      database: "server",
      user: "admin",
      password: "zaq1@WSX",
    },
    migrations: {
      tableName: "knex_migrations",
    },
    pool: { min: 0, max: 7 },
  },

  staging: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5432,
      database: "server",
      user: "admin",
      password: "zaq1@WSX",
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
      port: 5432,
      database: "server",
      user: "admin",
      password: "zaq1@WSX",
    },
    migrations: {
      tableName: "knex_migrations",
    },
    pool: { min: 0, max: 7 },
  },
};

export = connection; 
