const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const {promisify} = require('util');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const createSendToken = (id, res, user) => {
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
    data: user,
    token,
  });
}

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  // const token = generateToken();

  createSendToken(newUser._id, res, newUser);
  
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

  createSendToken(user._id, res, user);
});

exports.protectedRoutes = catchAsync(async (req, res, next) => {

  let token;

  // const authToken = req.headers.authorization;
  // if(authToken && authToken.startsWith('Bearer')){
  //   bearertoken = authToken.split(' ')[1];
  // } 

  if(req.cookies.jwt){
    token = req.cookies.jwt;
  }

  if(!token) {
    return next(new AppError("you are not logged in, please log in.", 400));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const loggedUser = await User.findById(decoded.id);

  if(!loggedUser){
    return next(new AppError("User not exist.", 400));
  }

  req.user = loggedUser;

  next();
});

exports.userRole = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)){
      return next(new AppError("You do not have permission to perform this task...", 400));
    }
    next();
  }
};

exports.logOut = catchAsync(async (req, res, next) => {
  res.clearCookie("jwt");

  res.status(200).json({
    status: 'success',
    message: 'Logged out.'
  });
});