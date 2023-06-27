import React, { useEffect, useState } from "react";
import { getInfoById, getArtistTopTracks } from "../spotify";
import { useParams } from "react-router-dom";
import { catchErrors } from "../utils";
import Spinner from "./Spinner";
import ExpandedHero from "./ExpandedHero";
import ExpandedTrackListHeader from "./ExpandedTrackListHeader";
import Tracklist from "./Tracklist";

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
          imgSource: data.images && data.images[0].url,
          createdBy: data.owner && data.owner.display_name,
          type: data.type,
          totalTracks: data.tracks && data.tracks.total,
          tracks: data.tracks && data.tracks.items,
          likes: data.followers && data.followers.total,
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
      } else if (data.type === "track") {
        setInfo((prevState) => {
          return {
            ...prevState,
            imgSource: data.album.images[0].url,
            createdBy: data.artists,
            tracks: [{ ...data, track: data }],
          };
        });
      }
    };
    catchErrors(fetchData());
  }, [id, type]);

  return (
    <div className="content">
      {!info ? (
        <Spinner />
      ) : (
        <>
          <ExpandedHero type={type} info={info} />
          <div className="expanded_tracks_container">
            {info.type !== "track" && <ExpandedTrackListHeader />}

            {info.type === "playlist" ? (
              <Tracklist tracks={info.tracks} />
            ) : info.type === "artist" ? (
              <>
                <Tracklist tracks={info && info.tracks} />
              </>
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ExpandedView;
