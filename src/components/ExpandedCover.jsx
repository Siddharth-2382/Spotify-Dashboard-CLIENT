import React from "react";

function ExpandedCover(props) {
  return (
    <img className={props.type + "_img"} src={props.imgSource} alt="cover" />
  );
}

export default ExpandedCover;
