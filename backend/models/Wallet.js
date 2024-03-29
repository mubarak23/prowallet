/* eslint-disable prettier/prettier */
/* eslint-disable strict */
/* eslint-disable no-unused-vars */
// "use strict";
const Sequelize = require("sequelize");
const postgresDb = require("../database/Pgconfig");

const Wallet = postgresDb.define(
  "wallets",
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
    walletBalanceMinor: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },

    currency: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: true,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = Wallet;
