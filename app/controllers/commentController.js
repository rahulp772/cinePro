const Comments = require("../models/commentModel");
const catchAsync = require("../../utils/catchAsync");
const Movie = require("../models/movieModel");


exports.getComment = catchAsync(async(req, res, next)=> {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);

    let comments = movie.comments;

    res.status(200).json({
        status: 'success',
        comments
    });
});

exports.createComment = catchAsync(async(req, res, next)=> {
    // get data from browser...
    const comment = req.body;
    const create = await Comments.create(comment);
    res.status(200).json({
        status: 'success',
        data: create
    });
});

exports.deleteComment = catchAsync(async(req, res, next) => {
    const comment = req.params.id;
    const deleteComment = await Comments.deleteOne({comment});

    res.status(204).json({
        status: "success"
    });
});