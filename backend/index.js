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
const path = require("path");

app.use(express.json()); // JSON middleware
app.use(express.urlencoded({ extended: true })); 


app.use(cors());
app.use(bp.json());
app.use(cp());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
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
