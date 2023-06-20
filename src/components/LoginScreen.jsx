import React from "react";

function LoginScreen() {
  return (
    <div className="login_screen">
      <div>
        <h1>Spotify Profile</h1>
      </div>

      <a className="login_button" href="http://localhost:8888/login">
        Log in to Spotify
      </a>
    </div>
  );
}

export default LoginScreen;
