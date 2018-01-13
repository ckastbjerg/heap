* https://yts.ag/api#list_movies
* USE append_to_response! https://developers.themoviedb.org/3/getting-started/append-to-response
* Link til KINO: http://www.kino.dk/film/m/me/mens-vi-lever

## Components

* CD collection
* DVD colletion
* Upcoming concerts
* Upcoming TV-shows
  * Netflix
  * HBO
  * DR
  * Youtube
* Upcoming movies
  * Theaters
  * Releases
    * https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/
* Upcoming album releases
  * https://developer.spotify.com/web-api
  * https://www.discogs.com/developers
* Audible collection
* Personal calendar
* List of digital subscriptions (manually maintained)
  * Audible,
  * Spotify,
  * Netflix,
  * HBO Nordic
  * Årstiderne
* Restaurants
* Games https://www.igdb.com/api
  * Steam http://steamcommunity.com/dev
  * PlayStation

## Functions

* Mark as watched/listened
* Remove suggestion (e.g.)
* Get random movie to watch/song to hear from favorites

## API's

* https://www.npmjs.com/package/audible-api
*

## Ideas

// https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoType=movie&q=fight%20club&key=AIzaSyC21UPi773BDnQX1Ljd1b1Uf_B3AgewBy4

// Has streaming links
// http://docs.gowatchit.apiary.io/#reference

## Todo

* [ ] integrate with youtube movies
* [ ]

// https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoType=movie&q=fight%20club&key=AIzaSyC21UPi773BDnQX1Ljd1b1Uf_B3AgewBy4

// Has streaming links
// http://docs.gowatchit.apiary.io/#reference

## Usage

You can use Heap using [the hosted version](someurl) or by cloning this repo and running it yourself.

#### Prerequisites

In any case, you will need to get an API key for [tmdb](https://www.igdb.com/api) and [igdb](https://www.igdb.com/api). You need your own keys, as these services are rate-limited and because Heap makes heavy use them. You will also need to [create a firebase app](https://firebase.google.com/) for storing your data.

####
