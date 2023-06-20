// Get the query params off the window's URL
export const getHashParams = () => {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

// Format milliseconds into MM:SS
export const formatDuration = (milliseconds) => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// Higher-order function for async/await error handling
export const catchErrors = (fn) =>
  function (...args) {
    return fn(...args).catch((err) => {
      console.error(err);
    });
  };
