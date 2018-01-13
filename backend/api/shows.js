"use strict";

const axios = require("axios");
const moment = require("moment");
const apiKey = process.env.TMDB_API_KEY;

const endpoint = "https://api.themoviedb.org/3";
const coversPath = "https://image.tmdb.org/t/p/w45_and_h67_bestv2";
const backgroundPath = "https://image.tmdb.org/t/p/w300";
const instance = axios.create({
  baseURL: endpoint,
  timeout: 3000
});

function getUpcomingEpisode(episodes) {
  const now = moment();
  return episodes.find(episode => !moment(episode.air_date).isBefore(now));
}

const getEpisodes = ({ id, season }) =>
  instance
    .get(`/tv/${id}/season/${season}?api_key=${apiKey}`)
    .then(res => res.data.episodes)
    .catch(err => {
      console.error("some error", err.response.data);
    });

const isFirstEpisodeInNewSeason = (upcomingEpisode, latestEpisode) =>
  upcomingEpisode &&
  upcomingEpisode.episode_number === 1 &&
  upcomingEpisode.season_number !== 1;

function getLatestEpisode({ episodes, upcomingEpisode, season, id }) {
  let latestEpisode = episodes[episodes.length - 1];

  if (upcomingEpisode) {
    latestEpisode = episodes.find(
      episode => episode.episode_number === upcomingEpisode.episode_number - 1
    );
  }

  if (latestEpisode) {
    return Promise.resolve(latestEpisode);
    // if the upcoming episode is the first in a new seaon, we need
    // to get the previous season to figure out the latest episode
  } else if (
    (season > 1 && !upcomingEpisode) ||
    isFirstEpisodeInNewSeason(upcomingEpisode)
  ) {
    return getEpisodes({ id, season: season - 1 }).then(
      episodes => episodes[episodes.length - 1]
    );
  } else {
    return Promise.resolve({});
  }
}

const getShow = ({ id, name }) =>
  instance
    .get(`/tv/${id}?api_key=${apiKey}`)
    .then(res => {
      const {
        number_of_seasons,
        status,
        backdrop_path,
        vote_average
      } = res.data;
      const season = number_of_seasons;
      const isReturning = status === "Returning Series";
      const backgroundImage = `${backgroundPath}/${backdrop_path}`;

      return getEpisodes({ id, season }).then(episodes => {
        const upcomingEpisode = getUpcomingEpisode(episodes);
        return getLatestEpisode({ episodes, upcomingEpisode, season, id }).then(
          latestEpisode => {
            return {
              id,
              name,
              isReturning,
              backgroundImage,
              rating: vote_average * 10,
              url: `https://www.themoviedb.org/tv/${id}-${name}`,
              latestEpisode: {
                airDate: latestEpisode.air_date,
                episodeNumber: latestEpisode.episode_number,
                seasonNumber: latestEpisode.season_number
              },
              upcomingEpisode: {
                airDate: upcomingEpisode ? upcomingEpisode.air_date : null,
                episodeNumber: upcomingEpisode
                  ? upcomingEpisode.episode_number
                  : null,
                seasonNumber: upcomingEpisode
                  ? upcomingEpisode.season_number
                  : null
              }
            };
          }
        );
      });
    })
    .catch(err => {
      console.error(err.response.data);
    });

function get(shows) {
  const promises = shows.map(show =>
    getShow({
      id: show.id,
      name: show.name
    })
  );

  return Promise.all(promises).then(list => list.filter(show => show !== null));
}

function search(query) {
  const encodedQuery = encodeURIComponent(query);
  const request = `/search/tv?api_key=${apiKey}&query=${encodedQuery}`;
  return instance
    .get(request)
    .then(res =>
      res.data.results.splice(0, 5).map(show => ({
        name: show.name,
        id: show.id,
        coverSrc: `${coversPath}/${show.poster_path}`
      }))
    )
    .catch(err => {
      console.error(err.response.data);
    });
}

module.exports.get = get;
module.exports.search = search;
