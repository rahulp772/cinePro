const catchAsync = require("../utils/catchAsync");
const Movie = require("../models/movieModel");
const AppError = require("../utils/appError");


exports.getHomePage = catchAsync(async(req, res, next)=>{
  const movies = await Movie.find();

    res.status(200).render('base', {
      movies
    });
});

exports.getOneMovie = catchAsync(async(req, res, next)=>{
  const movie = await Movie.findOne({slug: req.params.slug});

  if(!movie){
    return next(new AppError("Movie not found!", 404));
  }

  console.log(movie);
  res.status(200).render('detailPage', {
    title: `${movie.slug}`,
    movie
  });
});