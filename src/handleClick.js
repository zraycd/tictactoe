function handleClick(target, current) {
  if (current.winner) {
    return;
  }

  let cellCoordinates = JSON.parse(target.getAttribute("data-coordinates"));
  let containerRow = JSON.parse(target.parentElement.getAttribute("data-row"));
  let containerCol = JSON.parse(target.parentElement.getAttribute("data-col"));
  let marker;
  let containers = document.querySelectorAll(".container");

  current.moveCount % 2 === 0 ? (marker = "X") : (marker = "O");

  if (current.type === "normal") {
    //prettier-ignore
    current.placeMarker(cellCoordinates[0], cellCoordinates[1], current.board, marker);
    return;
  } else {
    if (!JSON.parse(target.parentElement.getAttribute("locked"))) {
      current.placeMarker(
        cellCoordinates[0],
        cellCoordinates[1],
        current.board[containerRow][containerCol],
        marker
      );
    } else {
      // current.placeMarker(
      //   cellCoordinates[0],
      //   cellCoordinates[1],
      //   current.board[current.lastMark.row][current.lastMark.col],
      //   marker
      // );
      return;
    }
    if (current.lastMark === null && current.type !== "normal") {
      containers.forEach((ctn) => {
        ctn.dataset.locked = JSON.stringify(true);
      });
    }

    containers.forEach((ctn) => {
      if (
        JSON.parse(ctn.dataset.row) === current.lastMark.row &&
        JSON.parse(ctn.dataset.col) === current.lastMark.col
      ) {
        ctn.dataset.locked = JSON.stringify(false);
      }
    });
  }
}

export default handleClick;
