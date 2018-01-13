"use strict";

const { IGDB_API_KEY } = process.env;
const axios = require("axios");
const moment = require("moment");

const igdb = require("igdb-api-node").default;
const client = igdb(IGDB_API_KEY);

const fields = [
  "name",
  "release_dates",
  "screenshots",
  "url",
  "aggregated_rating"
];

const regions = [1, 8]; // 1 = europe, 2 = worldwide
const gameModes = [
  3 // CO-OP
];
const platforms = [
  45, // PSN
  48, // PS4
  14 // MAC
];

function get(games) {
  const ids = games.map(game => game.id);
  return client.games({ ids }, fields).then(res => {
    return res.body.map(game => {
      const {
        id,
        name,
        release_dates,
        url,
        aggregated_rating,
        screenshots
      } = game;
      const date =
        release_dates &&
        release_dates.find(d => platforms.indexOf(d.platform) !== -1);
      const releaseDate = date ? date.date : null;
      const rating = aggregated_rating || null;
      const backgroundImage = screenshots
        ? `https:${screenshots[0].url}`
        : null;
      return { id, name, releaseDate, url, rating, backgroundImage };
    });
  });
}

function search(query) {
  return client
    .games(
      {
        search: query,
        limit: 5
      },
      ["name", "cover"]
    )
    .then(response => {
      return response.body.map(game =>
        Object.assign({}, game, {
          coverSrc: game.cover ? game.cover.url : ""
        })
      );
    })
    .catch(error => {
      throw error;
    });
}

module.exports.search = search;
module.exports.get = get;
