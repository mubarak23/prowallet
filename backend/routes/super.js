const express = require("express");
const superController = require("../controller/AdminController");
const router = express.Router();

// allWallets
router.get("/super/wallets", superController.allWallets);

// walletTransaction
router.get("/super/wallet/:id", superController.walletTransaction);


// deactivateWallet
router.put("/super/wallet/:id", superController.deactivateWallet);


