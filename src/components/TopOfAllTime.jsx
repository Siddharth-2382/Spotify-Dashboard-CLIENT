import React, { useState, useEffect } from "react";
import Button from "./Button";
import { getUserInfo } from "../spotify";
import { catchErrors } from "../utils";
import Album from "./Album";

function TopOfAllTime(props) {
  const [topTracks, setTopTracks] = useState();
  const [topArtists, setTopArtists] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const { topTracks, topArtists } = await getUserInfo();
      setTopTracks(topTracks);
      setTopArtists(topArtists);
    };
    catchErrors(fetchData());
  }, []);

  function handleClick() {}

  const fetchArtistArray = (artistArray) => {
    const artistNames = [];
    artistArray.forEach((artist) => {
      artistNames.push(artist.name);
    });
    return artistNames;
  };

  return (
    <div className="toat_container">
      <div>
        <div className="toat_header">
          <h3>Top Artists of All Time</h3>
          <Button buttonName={"see more"} handleClick={handleClick} />
        </div>
        <div>
          {topArtists &&
            topArtists.items.map((artist, index) => {
              return (
                <Album
                  key={index}
                  imgSource={artist.images[0] && artist.images[0].url}
                  coverType={"artist_cover"}
                  trackName={artist.name}
                />
              );
            })}
        </div>
      </div>
      <div>
        <div className="toat_header">
          <h3>Top Tracks of All Time</h3>
          <Button buttonName={"see more"} handleClick={handleClick} />
        </div>
        <div>
          {topTracks &&
            topTracks.items.map((track, index) => {
              return (
                track.album.images[0] && (
                  <Album
                    key={index}
                    imgSource={
                      track.album.images[0] && track.album.images[0].url
                    }
                    coverType={"album_cover"}
                    trackName={track.name}
                    albumName={track.album.name}
                    artistNames={fetchArtistArray(track.artists)}
                    trackDuration={track.duration_ms}
                  />
                )
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default TopOfAllTime;
