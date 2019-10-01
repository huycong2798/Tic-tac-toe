import React from "react";

function Square(props) {
  let corlorValue = "square btn-hover";
  const property = props;
  if (property.isEnd) {
    corlorValue = "square";
  }
  if (property.value === "X") {
    corlorValue = "square isXNext";
  }
  if (property.value === "O") {
    corlorValue = "square isONext";
  }
  if (property.isWin) {
    corlorValue += " highlight";
  }
  return (
    <button type="button" className={corlorValue} onClick={property.onClick}>
      {property.value}
    </button>
  );
}
export default Square;
