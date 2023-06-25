import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

function Playlist(props) {
  function handleClick(divID) {
    const playlistsDiv = document.getElementsByClassName("playlists");
    for (let i = 0; i < playlistsDiv.length; i++) {
      playlistsDiv[i].classList.remove("active");
    }
    const activePlaylist = document.getElementById(divID);
    activePlaylist.classList.add("active");
  }

  return (
    <Link to={`/${props.type.toLowerCase()}/${props.id}`}>
      <div
        className="playlists"
        id={props.id}
        onClick={() => handleClick(props.id)}
      >
        <div className="playlist">
          <img className={props.coverType} src={props.imgSource} alt="Cover" />
          <div>
            <h5>
              {props.name.length > 33
                ? props.name.slice(0, 33) + "..."
                : props.name}
            </h5>
            {props.type === "Playlist" ? (
              <p>
                {props.type} • {props.createdBy}
              </p>
            ) : (
              <p>{props.type}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Playlist;
