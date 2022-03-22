/* eslint-disable prettier/prettier */
/* eslint-disable strict */
/* eslint-disable no-unused-vars */
// "use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
 
    */
    const createTable = await queryInterface.createTable(
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

        createdAt: { allowNull: false, type: Sequelize.DATE },
        updatedAt: { allowNull: false, type: Sequelize.DATE },
        deletedAt: { allowNull: true, type: Sequelize.DATE },
      },
      {
        paranoid: true,
      }
    );

    return Promise.all(createTable);
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
 */

    return queryInterface.dropTable("wallets");
  },
};
