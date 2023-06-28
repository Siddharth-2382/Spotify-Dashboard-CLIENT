import React from "react";
import { formatDuration } from "../utils";

function Album(props) {
  const albumDesc =
    props.artistNames &&
    props.albumName &&
    props.artistNames.join(", ") + " • " + props.albumName;
  return (
    <div className="album">
      {props.expanded && <h3 className="duration">{props.index + 1}</h3>}
      <img
        className={props.coverType}
        src={props.imgSource}
        alt="Album cover"
      />
      <div>
        <h5>{props.trackName}</h5>
        <p>
          {albumDesc
            ? albumDesc
            : props.artistNames && props.artistNames.join(", ")}
        </p>
      </div>
      {props.expanded && (
        <>
          <span className="duration">{props.albumName}</span>
          <span className="duration">{props.releaseDate}</span>
        </>
      )}
      <span className="duration track_time">
        {props.trackDuration && formatDuration(props.trackDuration)}
      </span>
    </div>
  );
}

export default Album;
