const express = require('express');
const Parser = require('rss-parser');
const cors = require('cors');

const parser = new Parser();
const app = express();
app.use(cors());

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

app.get('/rss', async (req, res) => {
  const user = req.query.user;
  if (!user) {
    res.statusCode(400).json({
      error: 'Parameter "user" is required'
    });
  }

  const feed = await parser.parseURL(`https://letterboxd.com/${user}/rss`);
  res.json(feed.items);
});

app.listen(3000);