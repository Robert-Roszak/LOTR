const express = require('express');
const router = express.Router();
const axios = require('axios');

const headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer wVMOQYpJGsvrtWDjNQjq',
};

router.get('/characters', async (req, res) => {
  const limit = req.query.limit;
  const page = req.query.page;
  try {
    const result = await axios.get(`https://the-one-api.dev/v2/character?limit=${limit}&page=${page}`, {
      headers: headers,
    });
    if(!result) res.status(404).json({ characters: 'Not found' });
    else res.json(result.data);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/characters/filters', async (req, res) => {
  let queryArr = [];
  for (let queryName in req.query) {
    let queryObj = {};
    queryObj.queryName = queryName;
    queryObj.value = req.query[queryName];
    queryArr.push(queryObj);
  }

  const limit = queryArr[0].value;
  const page = queryArr[1].value;
  const filter = queryArr[2].queryName;
  const searchText = queryArr[2].value;
  try {
    const result = await axios.get(`https://the-one-api.dev/v2/character?limit=${limit}&page=${page}&${filter}=${searchText}`, {
      headers: headers,
    });
    if(!result) res.status(404).json({ characters: 'Not found' });
    else res.json(result.data);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
