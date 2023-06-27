import React, { useEffect, useState } from "react";
import { getInfoById, getArtistTopTracks } from "../spotify";
import { useParams } from "react-router-dom";
import { catchErrors } from "../utils";
import Spinner from "./Spinner";
import ExpandedCover from "./ExpandedCover";
import ExpandedInfo from "./ExpandedInfo";
import Album from "./Album";

function ExpandedView() {
  const { type, id } = useParams();

  const [info, setInfo] = useState({
    name: "",
    imgSource: "",
    createdBy: "",
    type: "",
    totalTracks: 0,
    tracks: [],
    likes: 0,
    genres: "",
    color: "",
  });

  useEffect(() => {
    setInfo(null);
    const fetchData = async () => {
      const { data } = await getInfoById(type, id);
      setInfo(() => {
        return {
          name: data.name,
          imgSource: data.images[0].url,
          createdBy: data.owner && data.owner.display_name,
          type: data.type,
          totalTracks: data.tracks && data.tracks.total,
          tracks: data.tracks && data.tracks.items,
          likes: data.followers.total,
          genres: data.genres,
          color:
            "#" +
            Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0"),
        };
      });
      if (data.type === "artist") {
        const {
          data: { tracks },
        } = await getArtistTopTracks(id);
        setInfo((prevState) => {
          return {
            ...prevState,
            tracks: tracks,
          };
        });
      }
    };
    catchErrors(fetchData());
  }, [id, type]);

  const fetchArtistArray = (artistArray) => {
    const artistNames = [];
    artistArray.forEach((artist) => {
      artistNames.push(artist.name);
    });
    return artistNames;
  };

  return (
    <div className="content">
      {!info ? (
        <Spinner />
      ) : (
        <>
          <div
            className="expanded_content"
            style={{
              backgroundImage: `linear-gradient(${info.color}, #000000)`,
            }}
          >
            <div className="display_header">
              <ExpandedCover type={type} imgSource={info.imgSource} />
              <ExpandedInfo {...info} />
            </div>
            {console.log(info.tracks)}
          </div>
          <div className="expanded_tracks_container">
            <div className="duration expanded_tracks_header">
              <span>#</span>
              <span>Track title</span>
              <span style={{ paddingLeft: "16px" }}>Album name</span>
              <span>Release date</span>
              <span>Duration</span>
            </div>
            <hr style={{ margin: "24px auto" }}></hr>

            {info.type === "playlist" ? (
              <>
                {info.tracks.map((track, index) => {
                  return (
                    track.track.album.images[0] && (
                      <Album
                        key={index}
                        index={index}
                        imgSource={
                          track.track.album.images[0] &&
                          track.track.album.images[0].url
                        }
                        coverType={"album_cover"}
                        trackName={track.track.name}
                        albumName={track.track.album.name}
                        artistNames={fetchArtistArray(track.track.artists)}
                        trackDuration={track.track.duration_ms}
                        releaseDate={track.track.album.release_date}
                        expanded={true}
                      />
                    )
                  );
                })}
              </>
            ) : (
              <>
                {info.tracks &&
                  info.tracks.map((track, index) => {
                    return (
                      track.album.images[0] && (
                        <Album
                          key={index}
                          index={index}
                          imgSource={
                            track.album.images[0] && track.album.images[0].url
                          }
                          coverType={"album_cover"}
                          trackName={track.name}
                          albumName={track.album.name}
                          artistNames={fetchArtistArray(track.artists)}
                          trackDuration={track.duration_ms}
                          releaseDate={track.album.release_date}
                          expanded={true}
                        />
                      )
                    );
                  })}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ExpandedView;
