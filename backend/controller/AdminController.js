/* eslint-disable prettier/prettier */
const sequelize = require("../database/Pgconfig");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");
const Wallet = require("../models/Wallet");
const WalletTransaction = require("../models/WalletTransaction");

// @Desc  all wallet lists
// @Route /super
// @Access Protected
exports.allWallets = async (req, res, next) => {
  return sequelize.transaction(async (t) => {
    try {
      const currentUser = req.user;
      const adminUser = await User.findByPk(currentUser.id);
      if (!adminUser.isAdmin) {
        return res.status(401).json({ message: "Not Authorized" });
      }
      
      const wallets = await Wallet.findAll({ order: [[ 'createdAt', 'ASC']]});
      res.status(200).json({
        user: adminUser,
        wallets
      });

    } catch (error) {
      t.rollback();
      return next(error);
    }
  });
};


// @Desc  single wallet transaction lists
// @Route /super
// @Access Protected
exports.walletTransaction = async (req, res, next) => {
  return sequelize.transaction(async (t) => {
    try {
      const currentUser = req.user;
      const walletId = req.param.id
      const adminUser = await User.findByPk(currentUser.id);
      if (!adminUser.isAdmin) {
        return res.status(401).json({ message: "Not Authorized" });
      }

      const walletTransactions = await WalletTransaction.findAll({
        where: { walletId: walletId }
      });

      res.status(200).json({
        user: adminUser,
        walletTransactions,
      });
    } catch (error) {
      t.rollback();
      return next(error);
    }
  });
};

// @Desc  Admin Deactivate user wallet
// @Route /super
// @Access Protected
exports.deactivateWallet = async (req, res, next) => {
  return sequelize.transaction(async (t) => {
    try {
      const currentUser = req.user;
      const walletId = req.param.id
      const adminUser = await User.findByPk(currentUser.id);
      if (!adminUser.isAdmin) {
        return res.status(401).json({ message: "Not Authorized" });
      }

      const userWallet = await Wallet.findByPk(walletId);

      await userWallet.update({ isActive: false }, { transaction: t });

      res.status(200).json({
        success: true,
        message: 'User Wallet Decativated Successfully'
      });
    } catch (error) {
      t.rollback();
      return next(error);
    }
  });
};
