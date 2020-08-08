const express = require("express");
const nodemon = require("nodemon");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

// VARIABLE DECLARATIONS
const DB = process.env.LOCAL_DATABASE;
const port = process.env.PORT;

const db = mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB Connected and Ready!");
  });

const server = app.listen(port, () => {
  console.log("App Running...");
});
