/* eslint-disable prettier/prettier */
const Sequelize = require("sequelize");
const DbConfig = require("../config/config.json")[process.env.NODE_ENV];

const PostgresDb = new Sequelize(
  DbConfig.database,
  DbConfig.username,
  DbConfig.password,
  {
    host: DbConfig.host,
    dialect: DbConfig.dialect,
    raw: true,
    port: DbConfig.port,
    seederStorage: DbConfig.seederStorage,
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
    dialectOptions: {
      connectTimeout: 100000,
    },
  }
);

PostgresDb.authenticate()
  .then(() => {
    console.log("Connection with database has been established successfully");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = PostgresDb;
