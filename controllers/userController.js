const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError");

exports.getAllUser = catchAsync( async (req, res, next) => {
  const users = await User.find();

    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
});

exports.getUser = catchAsync( async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if(!user){
    return next(new AppError("No user found!",404));
  }
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
    res.status(201).json({
      status: "success",
      data: user,
    });
});

exports.updateUser = catchAsync( async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
});

exports.deleteUser = catchAsync( async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      message: null,
    });
});
