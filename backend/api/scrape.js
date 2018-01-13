const axios = require("axios");
const htmlMetadata = require("html-metadata");

function get(url) {
  return htmlMetadata(url).then(data => ({
    title: data.openGraph ? data.openGraph.title : data.general.title,
    link: data.general.canonical,
    type: data.openGraph ? data.openGraph.type : undefined
  }));
}

module.exports.get = get;
