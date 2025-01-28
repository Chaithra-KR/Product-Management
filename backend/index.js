const express = require("express");
const app = express();
const versionOne = require("./versions/v1");
require("dotenv").config();
const cors = require("cors");
const bp = require("body-parser");
const cp = require("cookie-parser");
const fileUpload = require('express-fileupload');
const mongoose = require("mongoose");
const globalErrorHandler = require("./middleware/errorHandler");

app.use(express.json());
app.use(fileUpload());

app.use(cors());
app.use(bp.json());
app.use(cp());

mongoose
  .connect(process.env.DBC)
  .then(() => {
    console.log("DB-CONNECTED");
  })
  .catch((err) => {
    console.log(err?.message);
  });
app.use("/api/v1", versionOne);

app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Port ${process.env.PORT} is running now`);
});
