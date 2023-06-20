import React, { useState, useEffect } from "react";
import Album from "./Album";
import { getCurrentlyPlayingTrack } from "../spotify";
import { catchErrors } from "../utils";

function Player() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { item: track },
      } = await getCurrentlyPlayingTrack();
      setCurrentlyPlaying(track);
    };
    catchErrors(fetchData());
  }, []);

  const fetchArtistArray = (artistArray) => {
    const artistNames = [];
    artistArray.forEach((artist) => {
      artistNames.push(artist.name);
    });
    return artistNames;
  };

  return (
    <div className="player_container">
      {currentlyPlaying && (
        <Album
          imgSource={currentlyPlaying && currentlyPlaying.album.images[0].url}
          coverType={"album_cover"}
          trackName={currentlyPlaying.name}
          artistNames={fetchArtistArray(
            currentlyPlaying && currentlyPlaying.artists
          )}
        />
      )}
    </div>
  );
}

export default Player;
