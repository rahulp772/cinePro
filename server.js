const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const AppError = require("./utils/appError");

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
  }).catch(err => {
    console.log("Something went wrong with database connection! Please see detailed Error message: ", err.message);
    return new AppError("Something went wrong with database connection! Please see detailed Error message: ", err.message, 500);
  });

const server = app.listen(port, () => {
  console.log("App Running...");
});
