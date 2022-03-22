const express = require('express')
const dotenv = require('dotenv').config()
const defaultRoutes = require('./routes')
const { errorHandler } = require("./middleware/errorMiddleware");

const PORT = process.env.PORT || 5056

const app = express()

// json Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))


//default route
app.get('/', (req, res) => {
  res.status(200).json({ message: "Welcome to Pro Wallet Service API" });
})

app.use('/api/', defaultRoutes)


// app.use(errorHandler);

app.listen(PORT, () =>
  console.log(
    `Started ${process.env.NODE_ENV} server on port  ${process.env.PORT}`
  )
);
