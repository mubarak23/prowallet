/* eslint-disable prettier/prettier */
const sequelize = require("../database/Pgconfig");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");
const Wallet =require("../models/Wallet")
const WalletTransaction = require("../models/WalletTransaction")

// @Desc  use wallet Balance
// @Route /user
// @Access Public
exports.userWalletBalance = async (req, res, next) => {
  return sequelize.transaction(async (t) => {
    try {
      const user = req.user
      const usetExist = await User.findByPk(user.id)
      if(!usetExist){
          return res
            .status(401)
            .json({ message: "Invalid Request" });
      }
    const userWallet = await Wallet.findOne({
      where: {userId: user.id}
    })

    if(!userWallet){
       return res.status(401).json({ message: "Wallet Does not Exist" });
    }
    // structure the response payload
     res.status(200).json({
       userId: usetExist.id,
       wallet: userWallet,
       walletBalance: userWallet.walletBalanceMinor
     });
    } catch (error) {
      t.rollback();
      return next(error);
    }
  });
};

// @Desc  credit user wallet 
// @Route /wallet/credit
// @Access Public
exports.creditUserWallet = async (req, res, next) => {
  return sequelize.transaction(async (t) => {
    try {
      const { amount } = req.body
      console.log(amount)
      const user = req.user;
      console.log(user)
      const usetExist = await User.findByPk(user.id);
      if (!usetExist) {
        return res.status(401).json({ message: "Invalid Request" });
      }
      const userWallet = await Wallet.findOne({
        where: { userId: user.id },
      });

      if (!userWallet) {
        return res.status(401).json({ message: "Wallet Does not Exist" });
      }
      // credit the wallet and create wallet transaction
      const walletbalanceBefore = userWallet.walletBalanceMinor
      const walletbalanceAfter = walletbalanceBefore + amount
       await userWallet.update(
         { walletBalanceMinor: walletbalanceAfter },
         { transaction: t }
       );
     // create wallet transaction
    const creditWalletTransaction = await WalletTransaction.create({
      userId: usetExist.id,
      walletId: userWallet.id,
      amount: amount,
      type: "CREDIT",
      reference: uuidv4(),
      paidAt: new Date(),
      narration: "Card Transaction",
    });
      res.status(200).json({
        userId: usetExist.id,
        wallet: userWallet,
        walletBalance: walletbalanceAfter,
        walletTransaction: creditWalletTransaction,
      });
    } catch (error) {
      t.rollback();
      return next(error);
    }
  });
};

// @Desc  credit user wallet 
// @Route /wallet/credit
// @Access Public
exports.debitUserWallet = async (req, res, next) => {
  return sequelize.transaction(async (t) => {
    try {
      const { amount } = req.body
      console.log(amount)
      const user = req.user;
      console.log(user)
      const usetExist = await User.findByPk(user.id);
      if (!usetExist) {
        return res.status(401).json({ message: "Invalid Request" });
      }
      const userWallet = await Wallet.findOne({
        where: { userId: user.id },
      });

      if (!userWallet) {
        return res.status(401).json({ message: "Wallet Does not Exist" });
      }
      // debit the wallet and create wallet transaction
      const walletbalanceBefore = userWallet.walletBalanceMinor
      const walletbalanceAfter = walletbalanceBefore - amount
       await userWallet.update(
         { walletBalanceMinor: walletbalanceAfter },
         { transaction: t }
       );
     // create wallet transaction
    const creditWalletTransaction = await WalletTransaction.create({
      userId: usetExist.id,
      walletId: userWallet.id,
      amount: amount,
      type: "DEBIT",
      reference: uuidv4(),
      paidAt: new Date(),
      narration: "Direct Transaction",
    });
      res.status(200).json({
        userId: usetExist.id,
        wallet: userWallet,
        walletBalance: walletbalanceAfter,
        walletTransaction: creditWalletTransaction,
      });
    } catch (error) {
      t.rollback();
      return next(error);
    }
  });
};

