function handleClick(target, current) {
  if (current.winner && current.type === "normal") {
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
    if (
      !JSON.parse(target.parentElement.getAttribute("data-locked")) &&
      !current.finalWinner
    ) {
      current.placeMarker(
        cellCoordinates[0],
        cellCoordinates[1],
        current.board[containerRow][containerCol],
        marker,
        containerRow,
        containerCol
      );
    }
  }
}

export default handleClick;
