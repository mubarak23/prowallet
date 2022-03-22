/* eslint-disable prettier/prettier */
const sequelize = require("../database/Pgconfig");
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
;

