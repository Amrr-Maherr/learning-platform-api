require("dotenv").config();
const express = require("express");
const main = require("./config/db");
const app = express();
const port = process.env.PORT || 3000;
main();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
