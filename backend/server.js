const express = require('express');
const cors = require('cors');
const path = require('path');

const booksRoutes = require('./routes/books.routes');
const moviesRoutes = require('./routes/movies.routes');
const charactersRoutes = require('./routes/characters.routes');
const quotesRoutes = require('./routes/quotes.routes');
const chaptersRoutes = require('./routes/chapters.routes');

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* API ENDPOINTS */
app.use('/api', booksRoutes);
app.use('/api', moviesRoutes);
app.use('/api', charactersRoutes);
app.use('/api', quotesRoutes);
app.use('/api', chaptersRoutes);

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ post: 'Not found...' });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: '+port);
});
