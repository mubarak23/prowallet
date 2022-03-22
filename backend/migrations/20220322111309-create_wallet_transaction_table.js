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

        paidAt: { allowNull: false, type: Sequelize.DATE },

        narration: {
          type: Sequelize.STRING,
          allowNull: true,
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

    return queryInterface.dropTable("walletTransactions");
  },
};
