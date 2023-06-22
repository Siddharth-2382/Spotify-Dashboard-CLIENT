import React from "react";

function Card(props) {
  return (
    <div className="search_card">
      <img className={props.cardType} src={props.imgSource} alt="" />
      <h3 className="card_title">{props.title}</h3>
      <p className="card_info">{props.info}</p>
    </div>
  );
}

export default Card;
