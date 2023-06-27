import React from "react";
import ExpandedCover from "./ExpandedCover";
import ExpandedInfo from "./ExpandedInfo";

function ExpandedHero(props) {
  return (
    <div
      className="expanded_content"
      style={{
        backgroundImage: `linear-gradient(${props.info.color}, #000000)`,
      }}
    >
      <div className="display_header">
        <ExpandedCover type={props.type} imgSource={props.info.imgSource} />
        <ExpandedInfo {...props.info} />
      </div>
    </div>
  );
}

export default ExpandedHero;
