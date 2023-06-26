import React, { useEffect, useState } from "react";
import { getInfoById } from "../spotify";
import { useParams } from "react-router-dom";
import { catchErrors } from "../utils";
import Spinner from "./Spinner";
import ExpandedCover from "./ExpandedCover";
import ExpandedInfo from "./ExpandedInfo";

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
            <ExpandedCover type={type} imgSource={info.imgSource} />
            <ExpandedInfo {...info} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpandedView;
