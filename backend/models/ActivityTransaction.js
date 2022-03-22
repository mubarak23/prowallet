/* eslint-disable prettier/prettier */
/* eslint-disable strict */
/* eslint-disable no-unused-vars */
// "use strict";
const Sequelize = require("sequelize");
const postgresDb = require("../../database/PostgresDb");

const WalletTransactions = postgresDb.define(
  "walletTransactions",
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
    walletId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    amount: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    reference: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    paidAt: { allowNull: false, type: Sequelize.DATE },

    narration: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = WalletTransactions;
