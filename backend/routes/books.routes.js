const express = require('express');
const router = express.Router();

const headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer wVMOQYpJGsvrtWDjNQjq',
};

router.get('/books', async (req, res) => {
  try {
    const result = await fetch('https://the-one-api.dev/v2/book', {
      headers: headers,
    });
    if(!result) res.status(404).json({ product: 'Not found' });
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
