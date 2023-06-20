import React from "react";
import Sidebar from "./Sidebar";
import Profile from "./Profile";
import Player from "./Player";

function Home() {
  return (
    <div className="home">
      <Sidebar />
      <Profile />
      <Player />
    </div>
  );
}

export default Home;
