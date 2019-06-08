module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: "localhost",
    dialect: "mysql"

    // username: "root",
    // password: "123",
    // database: "project_db",
    // host: "localhost",
    // dialect: "mysql",
    // logging: false
  },
  test: {
    username: "root",
    password: "123",
    database: "project_db",
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
