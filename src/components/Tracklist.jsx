import React from "react";
import Album from "./Album";

function Tracklist({ tracks }) {
  const fetchArtistArray = (artistArray) => {
    const artistNames = [];
    artistArray.forEach((artist) => {
      artistNames.push(artist.name);
    });
    return artistNames;
  };
  return (
    <>
      {tracks &&
        tracks.map((track, index) => {
          const album = track.album || track.track.album;
          return (
            album.images[0] && (
              <Album
                key={index}
                index={index}
                imgSource={album.images[0].url}
                coverType={"album_cover"}
                trackName={
                  (track.track && track.track.name) || (track && track.name)
                }
                albumName={album.name}
                artistNames={fetchArtistArray(
                  (track.track && track.track.artists) ||
                    (track && track.artists)
                )}
                trackDuration={
                  (track.track && track.track.duration_ms) ||
                  (track && track.duration_ms)
                }
                releaseDate={album.release_date}
                expanded={true}
              />
            )
          );
        })}
    </>
  );
}

export default Tracklist;
