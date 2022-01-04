const express = require('express');
const router = express.Router();

router.get('/chapter', async (req, res) => {
  try {
    const result = await fetch('https://the-one-api.dev/v2/chapter');
    if(!result) res.status(404).json({ Chapter: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});
/*
router.get('/chapter/:id', async (req, res) => {
  try {
    const result = await Chapter
      .findById(req.params.id);
    if(!result) res.status(404).json({ Chapter: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});
 */
module.exports = router;
