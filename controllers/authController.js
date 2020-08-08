const Movie = require("../models/movieModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

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
  let token;
  if (!email || !password) {
    next(new AppError("Please Provide email or password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 400));
  }
  token = generateToken(user._id);
  res.status(200).json({
    status: "success",
    message: "You are logged in now!",
    data: user,
    token,
  });

});
