import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import Playlist from "./Playlist";
import { getUserInfo } from "../spotify";
import { catchErrors } from "../utils";

function Sidebar() {
  const [followedArtists, setFollowedArtists] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { followedArtists, playlists } = await getUserInfo();
      setFollowedArtists(followedArtists);
      setPlaylists(playlists);
    };
    catchErrors(fetchData());
  }, []);

  return (
    <div className="sidebar">
      <div className="nav">
        <Link to="/">
          <span>
            <FontAwesomeIcon icon={faHouse} />
          </span>
          Home
        </Link>
        <Link to="/search">
          <span>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
          Search
        </Link>
      </div>
      <div className="library">
        <div className="library_container">
          <Link className="user_library" to="">
            <span>
              <FontAwesomeIcon icon={faBars} rotation={90} />
            </span>
            Library
          </Link>
        </div>
        <div className="playlist_container">
          {playlists &&
            playlists.items.map((playlist) => (
              <Playlist
                key={playlist.id}
                id={playlist.id}
                imgSource={playlist.images[0].url}
                coverType={"album_cover"}
                name={playlist.name}
                createdBy={playlist.owner.display_name}
                type={"Playlists"}
              />
            ))}
          {followedArtists &&
            followedArtists.artists.items.map((artist) => (
              <Playlist
                key={artist.id}
                id={artist.id}
                imgSource={artist.images[0].url}
                coverType={"artist_cover"}
                name={artist.name}
                type={"Artists"}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
