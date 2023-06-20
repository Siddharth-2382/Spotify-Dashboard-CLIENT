import React from "react";
import { formatDuration } from "../utils";

function Album(props) {
  const albumDesc =
    props.artistNames &&
    props.albumName &&
    props.artistNames.join(", ") + " • " + props.albumName;
  return (
    <div className="album">
      <img
        className={props.coverType}
        src={props.imgSource}
        alt="Album cover"
      />
      <div>
        <h5>
          {props.trackName && props.trackName.length > 36
            ? props.trackName.slice(0, 36) + "..."
            : props.trackName}
        </h5>
        <p>
          {albumDesc
            ? albumDesc && albumDesc.length > 49
              ? albumDesc.slice(0, 49) + "..."
              : albumDesc
            : props.artistNames && props.artistNames.join(", ")}
        </p>
      </div>
      <span className="duration">
        {props.trackDuration && formatDuration(props.trackDuration)}
      </span>
    </div>
  );
}

export default Album;
