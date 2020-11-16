const mongoose = require("mongoose");
const slugify = require("slugify");
const CommentModel = require("../models/commentModel");

const movieSchema = mongoose.Schema({
  movieName: {
    type: String,
    required: [true, "A movie must have name."],
    trim: true,
    unique: true,
  },
  poster:{
    type: String,
    required: [true, "A movie poster image is required!"],
  },
  slug: String,
  genre: {
    type: [String],
    required: [true, "A movie must have genre."],
  },
  category: {
    type: String,
    required: [true, "Atleast one category required."],
  },
  releaseYear: {
    type: Number,
  },
  rating: Number,
  ratingQuantity: Number,
  duration: {
    type: String,
    required: [true, "A duration of movie must required"],
  },
  plot:{
    type: String,
    required:[true, "Please write something about movie plot!"],
  },
  quality: {
    type: String,
    required: [true, "Please provide quality of movie"],
  },
  size: {
    type: [Number],
    required: [true, "Please provide size of movie"],
  },
  resolution: {
    type: [String],
    required: [true, "Please provide resolution of movie"],
  },
  format: {
    type: String,
    required: [true, "Please provide format"],
  },
  fps: {
    type: String,
    required: [true, "Please specify FPS for video file"],
  },
  codec: {
    type: String,
    // required: [true, "Please specify Codec for video file"],
  },
  audioFormat:{
    type: [String],
    required: [true, 'Please Specify audio for movie'],
  },
  subtitles: {
    type: [String],
  },
  screenshots: {
    type: [String],
    // required: [true, "Please provide screenshots of movie."],
  },
  onlineWatchLink: {
    type: [String],
  },
  downloadLink: {
    type: [String],
    required: [true, "Please provide download link."],
  },
  comments: [{
    type: mongoose.Schema.ObjectId,
    ref: CommentModel
  }],
  addedAt: {
    type: Date,
    default: Date.now,
    required: [true, "added date must required"],
  },
});


movieSchema.pre('save', function(next){
  this.slug = slugify(this.movieName);
  next();
});


const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
