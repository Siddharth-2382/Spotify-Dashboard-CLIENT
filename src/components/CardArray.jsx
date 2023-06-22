import React from "react";
import Card from "./Card";
import cover from "./images/cover.jpeg";

function CardArray(props) {
  return (
    <div className="card_array">
      <h2>{props.arrayName}</h2>
      <div className="search_card_container">
        <Card
          imgSource={cover}
          cardType={props.cardType}
          title={""}
          info={""}
        />
      </div>
    </div>
  );
}

export default CardArray;
