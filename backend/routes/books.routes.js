const express = require('express');
const router = express.Router();
const axios = require('axios');

const headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer wVMOQYpJGsvrtWDjNQjq',
};

router.get('/books', async (req, res) => {
  try {
    const result = await axios.get('https://the-one-api.dev/v2/book', {
      headers: headers,
    });
    if(!result) res.status(404).json({ books: 'Not found' });
    else res.json(result.data);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/books/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await axios.get(`https://the-one-api.dev/v2/book/${id}/chapter`, {
      headers: headers,
    });
    if(!result) res.status(404).json({ books: 'Not found' });
    else res.json(result.data);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
