const Wallet = require('../models/Wallet')
const sequelize = require("../database/Pgconfig");
exports.createUserWallet = async (userId) => {
  return sequelize.transaction(async t => {
    const userWallet = await Wallet.create(
      {
        userId: userId,
        walletBalanceMinor: 0,
        currency: "NG",
        isActive: true
      },
      { transaction: t }
    );
    return userWallet
  })   
}