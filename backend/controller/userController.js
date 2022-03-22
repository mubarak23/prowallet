/* eslint-disable prettier/prettier */
const sequelize = require("../database/Pgconfig");
const User = require('../models/User')
const AuthService = require('../service/authService')
const WalletService = require('../service/walletService')


// @Desc Register a new user
// @Route /user
// @Access Public

exports.createUserAccount = async (req, res, next) => {
  return sequelize.transaction(async (t) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Includes all fields");
      }

      // find if user already exist
      const userExist = await User.findOne({ email });
      if (userExist) {
        res.status(400);
        throw new Error("User Already Exist on the System");
      }
      const hashPassword = await AuthService.generateHashPassword(password)
      // create user account
      const newUserAccount = await User.create(
          { name, email, hashPassword },
          { transaction: t }
      );
      // create user wallet via wallet service
      const newUserWallet = await WalletService.createUserWallet(newUserAccount.id)  

      return res.status(201).json({
        id: newUserAccount.id,
        name: newUserAccount.name,
        email: newUserAccount.email,
        token: AuthService.generateToken(newUserAccount.id),
      });
    } catch (error) {
      t.rollback();
      return next(error);
    }
  });
};
