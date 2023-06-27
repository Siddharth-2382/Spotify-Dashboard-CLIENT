import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Profile from "./Profile";
import Player from "./Player";
import Search from "./Search";
import ExpandedView from "./ExpandedView";

function Home() {
  return (
    <div className="home">
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/:type/:id" element={<ExpandedView />} />
        </Routes>
        <Player />
      </BrowserRouter>
    </div>
  );
}

export default Home;
