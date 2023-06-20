import React, { useState } from "react";

const buttonStyle = {
  backgroundColor: "transparent",
  color: "#ffffff",
  border: "1px solid #ffffff",
  borderRadius: "30px",
  padding: "12px 30px",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "1px",
  textTransform: "uppercase",
  textAlign: "center",
  transition: "all 0.25s cubic-bezier(0.3, 0, 0.4, 1)",
};

function Button(props) {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleButtonMouseOver = () => {
    setIsButtonHovered(true);
  };

  const handleButtonMouseOut = () => {
    setIsButtonHovered(false);
  };

  const buttonStyleWithHover = {
    ...buttonStyle,
    backgroundColor: isButtonHovered ? "#ffffff" : buttonStyle.backgroundColor,
    color: isButtonHovered ? "#121212" : buttonStyle.color,
    cursor: "pointer",
  };

  return (
    <button
      onClick={props.handleClick}
      onMouseOver={handleButtonMouseOver}
      onMouseOut={handleButtonMouseOut}
      style={isButtonHovered ? buttonStyleWithHover : buttonStyle}
    >
      {props.buttonName}
    </button>
  );
}

export default Button;
