
const express = require("express");
const walletController = require("../controller/walletController");
const { protected  } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/wallet", protected, walletController.userWalletBalance);

// creditUserWallet
router.post("/wallet/credit", protected, walletController.creditUserWallet);

// creditUserWallet
router.post("/wallet/debit", protected, walletController.debitUserWallet);

module.exports = router;


// userWalletBalance