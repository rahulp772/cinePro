const express = require("express");
const path = require('path');
const helmet = require("helmet");
const AppError = require("./utils/appError");
const movieRouter = require("./router/movieRouter");
const userRouter = require("./router/userRouter");
const errorController = require("./controllers/errController");
const viewRouter = require("./router/viewRouter");

const app = express();

app.use(express.json());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// MIDDLEWARES-------------------------------------------------------------

// Serving Static files
app.use(express.static(path.join(__dirname, 'public'))); // serve static files to server

// http headers
app.use(helmet());
app.use((req, res, next)=>{
    // console.log(req.headers);
  res.header("Access-Control-Allow-Origin",  `http://127.0.0.1:5000`); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// USE ROUTER
app.use("/", viewRouter);
app.use("/cinepro/api/v1/movies/", movieRouter);
app.use("/cinepro/api/v1/user/", userRouter);

// use global error handler middleware
app.all("*", (req, res, next) => {
  next(
    new AppError(
      `Requested URL ${req.originalUrl} not found on this server!`,
      404
    )
  );
});

// Global error handler middleware
app.use(errorController);

module.exports = app;
