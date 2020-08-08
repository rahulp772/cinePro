const Movie = require("../models/movieModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { update } = require("../models/movieModel");
const Features = require('../utils/features');

// const { json } = require("express");
// const { compareSync } = require("bcryptjs");

exports.getAllMovies = catchAsync(async (req, res, next) => {
  // let queryObj = { ...req.query };
  // const exclude = ["page", "limit", "sort", "fields"];
  // exclude.forEach((el) => delete queryObj[el]);

  // let fetchedDocument = Movie.find(queryObj);

  // if (req.query.sort) {
  //   const sortResult = req.query.sort.split(",").join(" ");
  //   fetchedDocument = fetchedDocument.sort(sortResult);
  // } else {
  //   fetchedDocument = fetchedDocument.sort("-addedAt");
  // }

  // if (req.query.fields) {
  //   const fields = req.query.fields.split(",").join(" ");
  //   fetchedDocument = fetchedDocument.select(fields);
  // } else {
  //   fetchedDocument = fetchedDocument.select("");
  // }

  // if (req.query.page) {
  //   const skipResults = (req.query.page - 1) * 5;
  //   fetchedDocument = fetchedDocument.skip(skipResults).limit(5);
  // } else {
  //   fetchedDocument = fetchedDocument.skip(0).limit(5);
  // }

  // const list = await fetchedDocument;

  const doc = new Features(Movie.find(), req.query)
    .filter()
    .sort()
    .fields()
    .paginate();

  const list = await doc.query;

  res.status(200).json({
    status: "success",
    result: list.length,
    data: {
      list,
    },
  });
});

exports.getMovie = catchAsync(async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    return next(new AppError("Movie Not Found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      movie,
    },
  });
});

exports.addMovie = catchAsync(async (req, res, next) => {
  const newMovie = await Movie.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      newMovie,
    },
  });
});

exports.updateMovie = catchAsync(async (req, res, next) => {
  const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    status: "success",
    message: "Movie Updated",
    data: {
      updated,
    },
  });
});

exports.deleteMovie = catchAsync(async (req, res, next) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
