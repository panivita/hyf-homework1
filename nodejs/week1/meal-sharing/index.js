const express = require("express");
const app = express();
const port = 3001;
const movies = require("./movies");

app.get("/titleIncludes/:myTitle", function (req, res) {
  const myTitle = req.params(myTitle);
  const moviesContainingKeywords = movies.filter((m) =>
    m.title.match(/myTitle(?:$|\W)/)
  );
  res.send(moviesContainingKeywords);
});

app.listen(port);
