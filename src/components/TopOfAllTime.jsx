import React, { useState, useEffect } from "react";
import { getUserInfo } from "../spotify";
import { catchErrors } from "../utils";
import Album from "./Album";
import { Link } from "react-router-dom";

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
        </div>
        <div>
          {topArtists &&
            topArtists.items.map((artist, index) => {
              return (
                <Link to={`/artists/${artist.id}`} key={index}>
                  <Album
                    imgSource={artist.images[0] && artist.images[0].url}
                    coverType={"artist_cover"}
                    trackName={artist.name}
                  />
                </Link>
              );
            })}
        </div>
      </div>
      <div>
        <div className="toat_header">
          <h3>Top Tracks of All Time</h3>
        </div>
        <div>
          {topTracks &&
            topTracks.items.map((track, index) => {
              return (
                track.album.images[0] && (
                  <Link to={`/tracks/${track.id}`} key={index}>
                    <Album
                      imgSource={
                        track.album.images[0] && track.album.images[0].url
                      }
                      coverType={"album_cover"}
                      trackName={track.name}
                      albumName={track.album.name}
                      artistNames={fetchArtistArray(track.artists)}
                      trackDuration={track.duration_ms}
                    />
                  </Link>
                )
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default TopOfAllTime;
