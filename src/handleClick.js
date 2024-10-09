function handleClick(target, current) {
  let coordinates;
  if (current.type === "normal" || current.moveCount > 0) {
    coordinates = JSON.parse(target.getAttribute("data-coordinates"));
  } else {
    coordinates = JSON.parse(
      target.parentElement.getAttribute("data-coordinates")
    );
  }
  current.placeMarker(coordinates[0], coordinates[1]);
}

export default handleClick;
