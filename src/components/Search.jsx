import React, { useRef, useState, useEffect } from "react";
import CardArray from "./CardArray";
import { getSearchResults, getRecentlyPlayedTrack } from "../spotify";
import { catchErrors } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Spinner from "./Spinner";

function Search() {
  const inputRef = useRef();
  const searchDivRef = useRef();

  const searchClick = () => {
    inputRef.current.focus();
  };

  const [recentlyPlayed, setRecentlyPlayed] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getRecentlyPlayedTrack();
      setRecentlyPlayed(data);
      setLoading(false);
    };
    catchErrors(fetchData());
  }, []);

  const fetchItems = (itemArray) => {
    const tracks = [];
    itemArray &&
      itemArray.forEach((item) => {
        tracks.push(item.track);
      });
    console.log(tracks);
    return tracks;
  };

  const [albums, setAlbums] = useState();
  const [playlists, setPlaylists] = useState();
  const [artists, setArtists] = useState();
  const [tracks, setTracks] = useState();
  const [shows, setShows] = useState();
  const [episodes, setEpisodes] = useState();

  function handleSearch(event) {
    searchDivRef.current.scrollTop = 0;
    if (!event.target.value) {
      setAlbums();
      setPlaylists();
      setArtists();
      setTracks();
      setEpisodes();
      setShows();
      return;
    }
    const q = encodeURIComponent(event.target.value);

    async function fetchSearch() {
      const {
        data: { albums, artists, episodes, playlists, shows, tracks },
      } = await getSearchResults(q);
      setAlbums(albums);
      setPlaylists(playlists);
      setArtists(artists);
      setTracks(tracks);
      setEpisodes(episodes);
      setShows(shows);
    }
    catchErrors(fetchSearch());
  }

  return (
    <div className="content">
      <div className="search_box">
        <div className="search_container" onClick={searchClick}>
          <span>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
          <input
            onChange={handleSearch}
            ref={inputRef}
            className="search_field"
            placeholder="what do you want to listen to?"
            autoFocus
          />
        </div>
      </div>
      <div ref={searchDivRef} className="search_content">
        {!(albums && playlists && artists && tracks && episodes && shows) && (
          <>
            <h2>Recently Played</h2>
            {loading ? (
              <Spinner />
            ) : (
              <CardArray
                cardType={"playable"}
                items={fetchItems(recentlyPlayed && recentlyPlayed.items)}
                isTrack={true}
              />
            )}
          </>
        )}
        {albums && (
          <CardArray
            arrayName={"Albums"}
            cardType={"playable"}
            items={albums.items}
          />
        )}
        {playlists && (
          <CardArray
            arrayName={"Playlists"}
            cardType={"playable"}
            items={playlists.items}
          />
        )}
        {artists && (
          <CardArray
            arrayName={"Artists"}
            cardType={"profile"}
            items={artists.items}
            type={"Artist"}
          />
        )}
        {tracks && (
          <CardArray
            arrayName={"Tracks"}
            cardType={"playable"}
            items={tracks.items}
            isTrack={true}
          />
        )}
        {episodes && (
          <CardArray
            arrayName={"Episodes"}
            cardType={"playable"}
            items={episodes.items}
          />
        )}
        {shows && (
          <CardArray
            arrayName={"Shows"}
            cardType={"playable"}
            items={shows.items}
          />
        )}
      </div>
    </div>
  );
}

export default Search;
