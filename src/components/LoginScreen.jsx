import React from "react";

function LoginScreen() {
  return (
    <div className="login_screen">
      <div>
        <h1>Spotify Profile</h1>
      </div>

      <a
        className="login_button"
        href={`${process.env.REACT_APP_BACKEND_URI}login`}
      >
        Log in to Spotify
      </a>
    </div>
  );
}

export default LoginScreen;
