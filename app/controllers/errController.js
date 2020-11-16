const AppError = require("./../../utils/appError");

const sendDevError = (err, req, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  })
}

const sendProdError = (err, req, res) => {
  if(err.name === 'CastError'){
    err.message =  `Invalid ${err.path}: ${err.value}`;
  }

  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
}

// send error based on production or development environment
module.exports = (err, req, res, next) => {
    err.status = err.status || "error";
    err.statusCode = err.statusCode || 500;

    if(process.env.NODE_ENV == 'development'){
      sendDevError(err, req, res);
    }

    if(process.env.NODE_ENV == 'production'){
      sendProdError(err, req, res);
    }
  };