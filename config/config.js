module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: "admini",
    password: "password1",
    database: "odg_db",
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
