import axios from "axios";
import { getHashParams } from "../utils";

// TOKENS ******************************************************************************
const EXPIRATION_TIME = 3600 * 1000; // 3600 seconds * 1000 = 1 hour in milliseconds

const setTokenTimestamp = () =>
  window.localStorage.setItem("spotify_token_timestamp", Date.now());
const setLocalAccessToken = (token) => {
  setTokenTimestamp();
  window.localStorage.setItem("spotify_access_token", token);
};
const setLocalRefreshToken = (token) =>
  window.localStorage.setItem("spotify_refresh_token", token);
const getTokenTimestamp = () =>
  window.localStorage.getItem("spotify_token_timestamp");
const getLocalAccessToken = () =>
  window.localStorage.getItem("spotify_access_token");
const getLocalRefreshToken = () =>
  window.localStorage.getItem("spotify_refresh_token");

// Refresh the token
const refreshAccessToken = async () => {
  try {
    const { data } = await axios.get(
      `${
        process.env.REACT_APP_BACKEND_URI
      }/refresh_token?refresh_token=${getLocalRefreshToken()}`
    );
    const { access_token } = data;
    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  } catch (e) {
    console.error(e);
  }
};

// Get access token off of query params (called on application init)
export const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParams();

  if (error) {
    console.error(error);
    refreshAccessToken();
  }

  // If token has expired
  if (
    getTokenTimestamp() &&
    Date.now() - getTokenTimestamp() > EXPIRATION_TIME
  ) {
    console.warn("Access token has expired, refreshing...");
    refreshAccessToken();
  }

  const localAccessToken = getLocalAccessToken();

  // If there is no ACCESS token in local storage, set it and return `access_token` from params
  if ((!localAccessToken || localAccessToken === "undefined") && access_token) {
    setLocalAccessToken(access_token);
    setLocalRefreshToken(refresh_token);
    return access_token;
  }

  return localAccessToken;
};

export const token = getAccessToken();

// LOGOUT METHOD ******************************************************************************

export const logout = () => {
  window.localStorage.removeItem("spotify_token_timestamp");
  window.localStorage.removeItem("spotify_access_token");
  window.localStorage.removeItem("spotify_refresh_token");
  window.location.reload();
};

// API CALLS ***************************************************************************************

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

// Get Current User's Profile
export const getUser = () =>
  axios.get("https://api.spotify.com/v1/me", { headers });

// Get User's Followed Artists
export const getFollowing = () =>
  axios.get("https://api.spotify.com/v1/me/following?type=artist", { headers });

// Get User's Playlists
export const getPlaylists = () =>
  axios.get("https://api.spotify.com/v1/me/playlists", { headers });

// Get User's Top Tracks
export const getTopTracks = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10",
    {
      headers,
    }
  );

// Get User's Top Artists
export const getTopArtists = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10",
    {
      headers,
    }
  );

// Get User's currently playing track
export const getCurrentlyPlayingTrack = () =>
  axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
    headers,
  });

// Get User's recently played tracks
export const getRecentlyPlayedTrack = () =>
  axios.get("https://api.spotify.com/v1/me/player/recently-played", {
    headers,
  });

// Get Search Results
export const getSearchResults = (query) =>
  axios.get(
    `https://api.spotify.com/v1/search?q=${query}&type=album%2Cplaylist%2Cshow%2Ctrack%2Cartist%2Caudiobook%2Cepisode&limit=10`,
    { headers }
  );

// Get info about artist/playlist by ID
export const getInfoById = (type, id) =>
  axios.get(`https://api.spotify.com/v1/${type}/${id}`, { headers });

// Get an Artist's top tracks
export const getArtistTopTracks = (id) =>
  axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=IN`, {
    headers,
  });

export const getUserInfo = () =>
  axios
    .all([
      getUser(),
      getFollowing(),
      getPlaylists(),
      getTopTracks(),
      getTopArtists(),
    ])
    .then(
      axios.spread(
        (user, followedArtists, playlists, topTracks, topArtists) => ({
          user: user.data,
          followedArtists: followedArtists.data,
          playlists: playlists.data,
          topTracks: topTracks.data,
          topArtists: topArtists.data,
        })
      )
    );
