/*global process */
"use strict";

const path = require("path");
const app = require("express")();
const http = require("http").Server(app);
const bodyParser = require("body-parser");

const games = require("./api/games");
const movies = require("./api/movies");
const shows = require("./api/shows");
const scrape = require("./api/scrape");

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/scrape", (req, res) => {
  scrape.get(req.body.url).then(data => res.send(data));
});

app.post("/shows", (req, res) => {
  shows.get(req.body.items).then(data => {
    res.send(data);
  });
});

app.get("/shows/find/:name", (req, res) => {
  shows.search(req.params.name).then(data => res.send(data));
});

app.post("/games", (req, res) => {
  games.get(req.body.items).then(data => res.send(data));
});

app.get("/games/find/:gameTitle", (req, res) => {
  games.search(req.params.gameTitle).then(data => res.send(data));
});

app.post("/movies", (req, res) => {
  movies.get(req.body.items).then(data => res.send(data));
});

app.get("/movies/find/:movieTitle", (req, res) => {
  movies.search(req.params.movieTitle).then(data => res.send(data));
});

const port = process.env.PORT || 1234;
http.listen(port, function() {
  console.log("listening on ", port);
});
