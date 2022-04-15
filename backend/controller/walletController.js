/* eslint-disable prettier/prettier */
const sequelize = require("../database/Pgconfig");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");
const Wallet =require("../models/Wallet")
const WalletTransaction = require("../models/WalletTransaction")

// @Desc  use wallet Balance
// @Route /user
// @Access Protected
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
// @Access Protected
exports.creditUserWallet = async (req, res, next) => {
  return sequelize.transaction(async (t) => {
    try {
      const { amount } = req.body
      const user = req.user;
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
// @Access Protected
exports.debitUserWallet = async (req, res, next) => {
  return sequelize.transaction(async (t) => {
    try {
      const { amount } = req.body
      const user = req.user;
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

// @Desc  wallet transfer between user 
// @Route /wallet/transfer
// @Access Protected
exports.WalletTransfer = async (req, res, next) => {
  return sequelize.transaction(async (t) => {
    try {
      // payload should contain amount, and  walletId,
      // confirm the login user exist
      // confirm the login user wallet has the amount he want to transfer to the wallet
      // confirm the recieving wallet exist,
      const currentUser = req.user;
      const { amount, walletId } = req.body;

      const usetExist = await User.findByPk(currentUser.id);
      if (!usetExist) {
        return res.status(401).json({ message: "Invalid Request" });
      }
      const currentUserWallet = await Wallet.findOne({
        where: { userId: currentUser.id },
      });
      if (currentUserWallet.walletBalanceMinor < amount) {
        return res
          .status(401)
          .json({ message: "Insufficient balance to process Wallet transfer" });
      }
      const destinationWallet = await Wallet.findByPk(walletId);
      if (!destinationWallet) {
        return res.status(401).json({ message: "Wallet Doest not Exist" });
      }
      // handle souece wallet debit
      const walletbalanceBefore = currentUserWallet.walletBalanceMinor;
      const walletbalanceAfter = walletbalanceBefore - amount;
      await currentUserWallet.update(
        { walletBalanceMinor: walletbalanceAfter },
        { transaction: t }
      );
      // handle souece wallet debit transaction - creditWalletTransaction
      await WalletTransaction.create({
        userId: currentUser.id,
        walletId: currentUserWallet.id,
        amount: amount,
        type: "DEBIT",
        reference: uuidv4(),
        paidAt: new Date(),
        narration: "WALLET to WALLET Transfer Transaction",
      });

      // handle destination wallet credit
      const destinationWalletbalanceBefore = destinationWallet.walletBalanceMinor;
      const destinationWalletbalanceAfter = destinationWalletbalanceBefore + amount;
      await destinationWallet.update(
        { walletBalanceMinor: destinationWalletbalanceAfter },
        { transaction: t }
      );
      // handle destination wallet credit transaction creditWalletTransaction
      await WalletTransaction.create({
        userId: destinationWallet.userId,
        walletId: destinationWallet.id,
        amount: amount,
        type: "CREDIT",
        reference: uuidv4(),
        paidAt: new Date(),
        narration: "WALLET to WALLET Transfer Transaction",
      });
    } catch (error) {
      t.rollback();
      return next(error);
    }
  });
};

