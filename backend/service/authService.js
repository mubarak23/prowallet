// const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");


exports.generateToken =  async (id) => {
  console.log('we are here at some point')
  console.log(process.env.JWT_SECRET);
  const token =  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token
};


exports.generateHashPassword = async (password) => {
   const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)
  return hashPassword
} 