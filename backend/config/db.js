require("dotenv").config();

module.exports = {
  developmentLocal: {
    dialect: "postgres",
    host: process.env.LOCAL_HOSTNAME,
    database: process.env.LOCAL_DB_NAME,
    username: process.env.LOCAL_USERNAME,
    password: process.env.LOCAL_PASSWORD,
    port: process.env.LOCAL_PORT,
    seederStorage: "sequelize"
  },
};
