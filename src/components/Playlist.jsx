import React, { useState } from "react";

function Playlist(props) {
  const [opacity, setOpacity] = useState(0);

  function handleMouseOver() {
    setOpacity(0.1);
  }

  function handleMouseOut() {
    setOpacity(0);
  }

  return (
    <div
      style={{ backgroundColor: `rgba(69, 69, 69, ${opacity})` }}
      className="playlists"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className="playlist">
        <img className={props.coverType} src={props.imgSource} alt="Cover" />
        <div>
          <h5>
            {props.name.length > 33
              ? props.name.slice(0, 33) + "..."
              : props.name}
          </h5>
          {props.type === "Playlist" ? (
            <p>
              {props.type} • {props.createdBy}
            </p>
          ) : (
            <p>{props.type}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Playlist;
