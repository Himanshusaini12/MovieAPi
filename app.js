const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const Movie = require('./model.js');

const morgan = require("morgan");

app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  next();
});

app.post('/add-movie', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json({ message: 'Movie added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add movie' });
  }
});

app.get('/get-all', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

app.get('/get-single', async (req, res) => {
  const movieId = req.query.id;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
});

app.get('/get-paginated', async (req, res) => {
  const page = parseInt(req.query.page);
  const size = parseInt(req.query.size);

  try {
    const skip = (page - 1) * size;
    const movies = await Movie.find().skip(skip).limit(size);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});



module.exports = app;