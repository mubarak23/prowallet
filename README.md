
## Pro Wallet Features


### User can create wallet — DONE
### User can login — DONE
### User can fund wallet — DONE
### User view wallet transaction —
### User can send to fund to another user wallet on the system -- DONE

### Admin can view all wallet 
### Admin can view wallet transaction
### Admin can deactivate wallet


### User can send to fund to another user wallet on the system -- DONE
  // payload should contain amount, and  walletId,
  // confirm the login user exist
  // confirm the login user wallet has the amount he want to transfer to the wallet
  // confirm the recieving wallet exist,
  // handle souece wallet debit
  // handle souece wallet debit transaction - debitWalletTransaction
  // handle destination wallet credit
  // handle destination wallet credit transaction creditWalletTransaction


### Entity model and migration
User — uuid, email, name, isStaff, isAdmin, password,
Wallet — uuid, userId, walletBalanceMinor, currency
walletTransaction — uuid, userId, WalletId, Amount, Type(enum - credit or debit), paidAt, narration(nullable)
ActivityTransaction — uuid, userId, description, meta(json object - nullable)




### `npm test`



### `npm run eject`

