import React from "react";
import Card from "./Card";

function CardArray(props) {
  const fetchArtists = (artistArray) => {
    const artistNames = [];
    artistArray &&
      artistArray.forEach((artist) => {
        artistNames.push(artist.name);
      });
    return artistNames;
  };

  return (
    <div className="card_array">
      <h2>{props.arrayName}</h2>
      <div className="search_card_container">
        {props.items &&
          props.items.map((item, index) => (
            <Card
              key={index}
              imgSource={
                props.isTrack
                  ? item.album.images &&
                    item.album.images.length > 0 &&
                    item.album.images[0].url
                  : item.images && item.images.length > 0 && item.images[0].url
              }
              cardType={props.cardType}
              title={item.name}
              creator={item.owner && item.owner.display_name}
              type={props.type}
              artistNames={fetchArtists(item && item.artists)}
              release_date={item.release_date}
              publisher={item.publisher}
            />
          ))}
      </div>
    </div>
  );
}

export default CardArray;
