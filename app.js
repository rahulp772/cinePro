const express = require("express");
const path = require('path');
const helmet = require("helmet");
const morgan = require('morgan');
const AppError = require("./utils/appError");
const movieRouter = require("./app/router/movieRouter");
const userRouter = require("./app/router/userRouter");
const commentsRouter = require("./app/router/commentsRouter");
const errorController = require("./app/controllers/errController");
const viewRouter = require("./app/router/viewRouter");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// MIDDLEWARES-------------------------------------------------------------

// Logger
app.use(morgan('tiny'));

// cookie Parser
app.use(cookieParser());
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
app.use("/cinePro/api/v1/comments/", commentsRouter);

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
