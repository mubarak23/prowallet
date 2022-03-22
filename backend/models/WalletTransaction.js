/* eslint-disable prettier/prettier */
/* eslint-disable strict */
/* eslint-disable no-unused-vars */
// "use strict";
const Sequelize = require("sequelize");
const postgresDb = require("../database/Pgconfig");

const ActivityTransactions = postgresDb.define(
  "activityTransactions",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: new Sequelize.UUIDV4(),
      unique: true,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    meta: {
      type: Sequelize.OBJECT,
      allowNull: true,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = ActivityTransactions;
