import React, { useEffect, useState } from "react";
import { getInfoById } from "../spotify";
import { useParams } from "react-router-dom";
import { catchErrors } from "../utils";
import Spinner from "./Spinner";

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
    };
    catchErrors(fetchData());
  }, [id, type]);

  return (
    <div className="content">
      {!info ? (
        <Spinner />
      ) : (
        <div
          className="expanded_content"
          style={{
            backgroundImage: `linear-gradient(${info.color}, #000000)`,
          }}
        >
          <div className="display_header">
            <img className={type + "_img"} src={info.imgSource} alt="cover" />
            <div className="display_info">
              <h6>{info.type.toUpperCase()}</h6>
              <div
                className="display_header_name"
                style={{
                  fontSize:
                    info.name.length > 17
                      ? info.name.length < 23
                        ? "4.5rem"
                        : "3rem"
                      : "6rem",
                  fontWeight: "800",
                }}
              >
                {info.name}
              </div>
              <h5>
                {info.type === "playlist"
                  ? info.createdBy +
                    " • " +
                    info.likes +
                    " likes • " +
                    info.totalTracks +
                    " songs"
                  : "Genres • " + (info.genres ? info.genres.join(", ") : "")}
              </h5>
            </div>
          </div>
          {console.log(info.tracks[0])}
        </div>
      )}
    </div>
  );
}

export default ExpandedView;
