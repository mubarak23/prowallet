const Wallet = require('../models/Wallet')
const sequelize = require("../database/Pgconfig");
exports.createUserWallet = async (userId) => {
  return sequelize.transaction(async t => {
    const userWallet = await Wallet(
      {
        userId: userId,
        walletBalanceMinor: 0,
        currency: "NG",
      },
      { transaction: t }
    );
    return userWallet
  })   
}