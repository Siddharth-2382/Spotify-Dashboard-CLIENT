import React from "react";

function LoginScreen() {
  const BACKEND_URI = "http://spotify-dashboard-server.vercel.app/login";
  return (
    <div className="login_screen">
      <div>
        <h1>Spotify Profile</h1>
      </div>

      <a className="login_button" href={BACKEND_URI}>
        Log in to Spotify
      </a>
    </div>
  );
}

export default LoginScreen;
