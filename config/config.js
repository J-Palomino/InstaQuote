module.exports = {
  development: {
    /* username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, */
    username: "root",
    password: "password",
    database: "exampledb",
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: "password",
    database: "exampledb",
    host: "localhost",
    dialect: "mysql",
    logging: false
  },
  production: {
    // eslint-disable-next-line camelcase
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  }
};
