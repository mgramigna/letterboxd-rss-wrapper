const express = require("express");
const Parser = require("rss-parser");
const cors = require("cors");
const letterboxd = require("letterboxd");

const parser = new Parser();
const app = express();
app.use(cors());

const port = process.env.PORT || 3000;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

app.get("/rss", async (req, res) => {
  const user = req.query.user;
  if (!user) {
    return res.status(400).json({
      error: 'Parameter "user" is required',
    });
  }

  try {
    const feed = await letterboxd(user);
    return res.json(feed);
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
});

app.listen(port);
