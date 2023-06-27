import React from "react";
import { Link } from "react-router-dom";

function Card(props) {
  return (
    <Link
      to={
        props.arrayType === "Playlists"
          ? `/${props.arrayType.toLowerCase()}/${props.id}`
          : props.arrayType === "Artists"
          ? `/${props.arrayType.toLowerCase()}/${props.id}`
          : null
      }
    >
      <div className="search_card">
        <img
          className={props.cardType}
          src={props.imgSource.toString()}
          alt=""
        />
        <h3 className="card_title">
          {props.title.length > 18
            ? props.title.slice(0, 17) + "..."
            : props.title}
        </h3>
        <p className="card_info">
          {props.creator && props.creator.length > 25
            ? props.creator && "By " + props.creator.slice(0, 24) + "..."
            : props.creator && "By " + props.creator}
        </p>
        <p className="card_info">{props.type ? props.type : null}</p>
        <p className="card_info">
          {props.artistNames.join(", ").length > 25
            ? props.artistNames.join(", ").slice(0, 24) + "..."
            : props.artistNames.join(", ")}
        </p>
        <p className="card_info">
          {props.artistNames.length === 0 ? props.release_date : null}
        </p>
        <p className="card_info">{props.publisher && props.publisher}</p>
      </div>
    </Link>
  );
}

export default Card;
