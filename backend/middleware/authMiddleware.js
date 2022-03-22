const jwt = require("jsonwebtoken");

const User = require("../models/User");

const protected = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get Token
      token = req.headers.authorization.split(" ")[1];

      //verify the token
      const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findByPk(decodeToken.id);
      next();
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: "Not Authorized" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not Authorized" })
  }
};


module.exports = { protected };
