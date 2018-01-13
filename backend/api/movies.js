"use strict";

// https://developers.themoviedb.org

const axios = require("axios");
const moment = require("moment");
const apiKey = process.env.TMDB_API_KEY;

// tmdb currently rate limit requests to 40 requests every 10 seconds
const RATE_LIMIT = 40;
const RELEASE_TYPES = {
  premiere: 1,
  theatrical_limited: 2,
  theatrical: 3,
  digital: 4, // doesn't have DK releases it seems :/
  physical: 5,
  tv: 6
};
const endpoint = "https://api.themoviedb.org/3";
const instance = axios.create({
  baseURL: endpoint,
  timeout: 3000
});

function getReleaseDate({ results, types }) {
  const release =
    results.find(rel => {
      return rel.iso_3166_1 === "DK" || rel.iso_3166_1 === "US";
    }) || results[0];

  const releaseDate = release.release_dates.find(date => {
    return types.find(type => type === date.type);
  });

  if (!releaseDate) {
    return null;
  }

  return {
    date: releaseDate.release_date,
    countryCode: release.iso_3166_1,
    note: release.note
  };
}

function getReleaseDates({ id, name, results }) {
  const releaseDateTheatrical = getReleaseDate({
    results,
    types: [
      RELEASE_TYPES.theatrical,
      RELEASE_TYPES.premiere,
      RELEASE_TYPES.theatrical_limited
    ]
  });
  const releaseDateDigital = getReleaseDate({
    results,
    types: [RELEASE_TYPES.digital, RELEASE_TYPES.physical, RELEASE_TYPES.tv]
  });

  return {
    releaseDateDigital,
    releaseDateTheatrical,
    name,
    id
  };
}

function getDetails(movie) {
  const { id, name } = movie;
  return instance
    .get(`/movie/${id}?api_key=${apiKey}&append_to_response=release_dates`)
    .then(res => {
      const releases = getReleaseDates({
        id: id,
        name: name,
        results: res.data.release_dates.results
      });
      return Object.assign({}, movie, releases, {
        url: `https://www.themoviedb.org/movie/${id}-${name}`,
        rating: res.data.vote_average * 10,
        imdbUrl: `http://www.imdb.com/title/${res.data.imdb_id}`,
        runtime: res.data.runtime,
        dateUpdated: new Date(),
        backgroundImage: `https://image.tmdb.org/t/p/w300/${
          res.data.backdrop_path
        }`
      });
    })
    .catch(err => {
      console.error(err);
    });
}

function get(movies) {
  const chunk = movies.slice(0, RATE_LIMIT);
  const promises = chunk.map(movie =>
    getDetails(movie).catch(err => {
      console.error(err);
    })
  );

  return Promise.all(promises)
    .then(list => list)
    .catch(err => console.log(err));
}

function search(query) {
  const request = `/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
    query
  )}`;
  return instance.get(request).then(res => {
    const results = res.data.results.splice(0, 5).map(movie => ({
      name: movie.title,
      id: movie.id,
      coverSrc: `https://image.tmdb.org/t/p/w45_and_h67_bestv2/${
        movie.poster_path
      }`
    }));

    return results;
  });
}

module.exports.get = get;
module.exports.search = search;
