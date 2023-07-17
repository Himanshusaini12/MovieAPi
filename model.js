const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  }
});

const Movie = mongoose.model("movie", movieSchema);

module.exports = Movie;
