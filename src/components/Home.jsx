import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Profile from "./Profile";
import Player from "./Player";
import Search from "./Search";

function Home() {
  return (
    <div className="home">
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        <Player />
      </BrowserRouter>
    </div>
  );
}

export default Home;
