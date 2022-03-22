/* eslint-disable prettier/prettier */
/* eslint-disable strict */
/* eslint-disable no-unused-vars */
// "use strict";
const Sequelize = require("sequelize");
const postgresDb = require("../../database/PostgresDb");

const Users = postgresDb.define(
  "users",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: new Sequelize.UUIDV4(),
      unique: true,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: true,
    },

    isStaff: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false,
    },

    isAdmin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = Users;
