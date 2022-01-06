const express = require('express');
const router = express.Router();
const axios = require('axios');

const headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer wVMOQYpJGsvrtWDjNQjq',
};

router.get('/movies', async (req, res) => {
  try {
    const result = await axios.get('https://the-one-api.dev/v2/movie', {
      headers: headers,
    });
    if(!result) res.status(404).json({ movies: 'Not found' });
    else res.json(result.data);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/movies/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await axios.get(`https://the-one-api.dev/v2/movie/${id}`, {
      headers: headers,
    });
    if(!result) res.status(404).json({ movies: 'Not found' });
    else res.json(result.data);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/movies/:id/quote', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await axios.get(`https://the-one-api.dev/v2/movie/${id}/quote`, {
      headers: headers,
    });
    if(!result) res.status(404).json({ movies: 'Not found' });
    else res.json(result.data);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
