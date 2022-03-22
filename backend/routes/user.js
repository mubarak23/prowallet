const express = require("express");
const userController = require('../controller/userController')
const router = express.Router()

router.post('/user', userController.createUserAccount);

router.post('/user/login', userController.userLogin)


module.exports = router;