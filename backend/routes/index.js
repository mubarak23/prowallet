/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const express = require("express");

const router = express.Router();

const fs = require("fs");
const path = require("path");

router.route("/").all((req, res) =>
  res.status(200).send({
    status: true,
    message: "😊",
    data: {
      service: "cloudenly-api",
      version: "1.0",
    },
  })
);
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .map((file) => router.use(require(`./${file}`)));

module.exports = router;
