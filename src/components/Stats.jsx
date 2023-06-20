import React from "react";

const h3Style = {
  color: "#1DB954",
};

const h4Style = {
  color: "#9B9B9B",
  fontWeight: "200",
};

function Stats(props) {
  return (
    <div>
      <h3 style={h3Style}>{props.statCount}</h3>
      <h4 style={h4Style}>{props.statName}</h4>
    </div>
  );
}

export default Stats;
