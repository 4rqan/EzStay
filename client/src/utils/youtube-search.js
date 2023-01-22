import axios from "axios";

var ROOT_URL = "https://www.googleapis.com/youtube/v3/search";

const YTSearch = (options, callback) => {
  var params = {
    part: "snippet",
    key: process.env.REACT_APP_YOUTUBE_KEY,
    q: options.term,
    type: options.type || "video",
    topicId:"/m/01k8wb",
  };
  if(params.type == "video"){
    params.videoCategoryId=27;
  }

  axios
    .get(ROOT_URL, { params: params })
    .then(function (response) {
      if (callback) {
        callback(response.data.items);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const getPlaylistItems = (
  id,
  callback,
  pageToken = undefined,
  maxResults = 10
) => {
  const url = "https://youtube.googleapis.com/youtube/v3/playlistItems";

  var params = {
    part: "contentDetails",
    playlistId: id,
    key: process.env.REACT_APP_YOUTUBE_KEY,
    maxResults,
  };

  if (pageToken) params.pageToken = pageToken;

  axios
    .get(url, { params: params })
    .then(function (response) {
      if (callback) {
        callback(response.data);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const getPlaylists = (
  ids,
  callback,
  pageToken = undefined,
  maxResults = 5
) => {
  const url = "https://youtube.googleapis.com/youtube/v3/playlists";

  var params = {
    part: "snippet",
    id: ids.join(","),
    key: process.env.REACT_APP_YOUTUBE_KEY,
    maxResults,
  };

  if (pageToken) params.pageToken = pageToken;

  axios
    .get(url, { params: params })
    .then(function (response) {
      if (callback) {
        callback(response.data);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
};

export default YTSearch;
