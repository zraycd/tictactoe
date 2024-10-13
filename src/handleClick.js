function handleClick(target, current) {
  if (current.winner) {
    return;
  }

  let cellCoordinates = JSON.parse(target.getAttribute("data-coordinates"));
  let containerRow = JSON.parse(target.parentElement.getAttribute("data-row"));
  let containerCol = JSON.parse(target.parentElement.getAttribute("data-col"));
  let marker;

  current.moveCount % 2 === 0 ? (marker = "X") : (marker = "O");

  if (current.type === "normal") {
    //prettier-ignore
    current.placeMarker(cellCoordinates[0], cellCoordinates[1], current.board, marker);
    return;
  } else {
    if (!JSON.parse(target.parentElement.getAttribute("data-locked"))) {
      current.placeMarker(
        cellCoordinates[0],
        cellCoordinates[1],
        current.board[containerRow][containerCol],
        marker
      );
    } else {
      return;
    }
  }
}

export default handleClick;
