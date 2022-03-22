/* eslint-disable prettier/prettier */
const sequelize = require("../database/Pgconfig");
const User = require('../models/User')
const bcrypt = require("bcryptjs");
const Wallet = require('../models/Wallet')
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");


// @Desc Register a new user
// @Route /user
// @Access Public

exports.createUserAccount = async (req, res, next) => {
  return sequelize.transaction(async (t) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Please Includes all fields" });
      }
    
      // find if user already exist
      const userExist = await User.findOne({
        where: { email: email },
      });

      if (userExist) {
        return res
          .status(400)
          .json({ message: "User Already Exist on the System" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
     
      // create user account
      const newUserAccount = await User.create(
        {
          name: name,
          email: email,
          hashPassword: hashPassword,
          isActive: true,
          isAdmin: false,
          isStaff: false
        },
        { transaction: t }
      );

      // create user wallet via wallet service
      await Wallet.create(
        {
          userId: newUserAccount.id,
          walletBalanceMinor: 0,
          currency: "NG",
          isActive: true,
        },
        { transaction: t }
      );
      return res.status(201).send({
        id: newUserAccount.id,
        name: newUserAccount.name,
        email: newUserAccount.email,
        token: await this.generateToken(newUserAccount.id),
      });
    } catch (error) {
      t.rollback();
      return next(error);
    }
  });
};

exports.generateToken = async (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};