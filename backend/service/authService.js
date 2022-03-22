require("dotenv").config();

exports.generateToken =  async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};


exports.generateHashPassword = async (password) => {
   const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)
  return hashPassword
} 