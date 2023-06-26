import React from "react";

function ExpandedInfo(props) {
  return (
    <div className="display_info">
      <h6>{props.type.toUpperCase()}</h6>
      <div
        className="display_header_name"
        style={{
          fontSize:
            props.name.length > 17
              ? props.name.length < 23
                ? "4.5rem"
                : "3rem"
              : "6rem",
          fontWeight: "800",
        }}
      >
        {props.name}
      </div>
      <h5>
        {props.type === "playlist"
          ? props.createdBy +
            " • " +
            props.likes +
            " likes • " +
            props.totalTracks +
            " songs"
          : "Genres • " + (props.genres ? props.genres.join(", ") : "")}
      </h5>
    </div>
  );
}

export default ExpandedInfo;
