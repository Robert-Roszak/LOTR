const express = require('express');
const router = express.Router();
const axios = require('axios');

const headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer wVMOQYpJGsvrtWDjNQjq',
};

router.get('/quotes/random', async (req, res) => {
  try {
    let result = {};

    const rawQuotes = await axios.get('https://the-one-api.dev/v2/quote', {
      headers: headers,
    });

    const randomNumber = Math.floor(Math.random() * rawQuotes.data.docs.length);
    const quote = rawQuotes.data.docs[randomNumber];
    result.quote = quote.dialog;

    const rawCharacter = await axios.get('https://the-one-api.dev/v2/character?_id=' + quote.character, {
      headers: headers,
    });
    result.character = rawCharacter.data.docs[0].name;

    const rawMovie = await axios.get('https://the-one-api.dev/v2/movie?_id=' + quote.movie, { headers: headers });
    result.movie = rawMovie.data.docs[0].name;

    if(!result) res.status(404).json({ Quote: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});
/*
router.get('/products/:id', async (req, res) => {
  try {
    const result = await Product
      .findById(req.params.id);
    if(!result) res.status(404).json({ product: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});
 */
module.exports = router;
