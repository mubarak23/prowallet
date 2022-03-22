const express = require("express");
const userController = require('../controller/userController')
const router = express.Router()

router.route("/user").post(userController.createUserAccount);


module.exports = router;