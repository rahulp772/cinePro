const Movie = require("../models/movieModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const createSendToken = (id, res) => {
  const token = generateToken(id);
  const cookieOpt = {
    expires: new Date(Date.now() + process.env.JWT_EXPIRE * 24*60*60*1000),
    httpOnly: true
  }
  if(process.env.NODE_ENV == 'production') cookieOpt.secure = true;
  res.cookie('jwt', token, cookieOpt);
  res.status(200).json({
    status: "success",
    message: "You are logged in now!",
    // data: user,
    token,
  });
}

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  const token = generateToken(newUser._id);

  res.status(201).json({
    status: "success",
    data: newUser,
  });
});

exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new AppError("Please Provide email or password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 400));
  }
  createSendToken(user._id, res);
});

exports.protectedRoutes = catchAsync(async (req, res, next) => {
  // let token = req.token;
  if(!req.user){
    next(new AppError("Invalid token. Please Login again.", 400));
  }
  next();
});
