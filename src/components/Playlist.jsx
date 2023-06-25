import React from "react";
import { Link, useLocation } from "react-router-dom";

function Playlist(props) {
  const location = useLocation();

  return (
    <Link to={`/${props.type.toLowerCase()}/${props.id}`}>
      <div
        className={`playlists ${
          location.pathname === `/${props.type.toLowerCase()}/${props.id}`
            ? "active"
            : ""
        }`}
        id={props.id}
      >
        <div className="playlist">
          <img className={props.coverType} src={props.imgSource} alt="Cover" />
          <div>
            <h5>
              {props.name.length > 33
                ? props.name.slice(0, 33) + "..."
                : props.name}
            </h5>
            {props.type === "Playlists" ? (
              <p>
                {props.type} • {props.createdBy}
              </p>
            ) : (
              <p>{props.type}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Playlist;
