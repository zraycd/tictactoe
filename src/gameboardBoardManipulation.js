import gameboardPlace from "./gameboardPlaceMarker";

class gameboardManipulation extends gameboardPlace {
  displayBoard(mainContainer = document.querySelector(".mainContainer")) {
    //prettier-ignore
    const coordinates = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
    let j = 0;

    if (this.type === "normal") {
      this.board.forEach((mainRow) => {
        mainRow.forEach((mainCol) => {
          let cell = document.createElement("div");
          cell.classList.add("cell");
          cell.dataset.coordinates = JSON.stringify(coordinates[j]);
          typeof mainCol === typeof ""
            ? (cell.textContent = mainCol)
            : (cell.textContent =
                mainCol[coordinates[j][0]][coordinates[j][1]]);

          mainContainer.appendChild(cell);
          j++;
        });
      });
    } else {
      j = 0;

      this.board.forEach((mainRow) => {
        mainRow.forEach((mainCol) => {
          let container = document.createElement("div");
          container.classList.add("container");
          container.dataset.coordinates = JSON.stringify(coordinates[j]);
          mainContainer.appendChild(container);
          j++;
        });
      });

      document.querySelectorAll(".container").forEach((container) => {
        let i = new (require("./gameboard").default)("normal");
        i.board = this.board;
        i.displayBoard(container);
      });
    }
  }

  hideBoard() {
    document.querySelectorAll(".container").forEach((ctn) => ctn.remove());
    document.querySelectorAll(".cell").forEach((cell) => cell.remove());
  }

  resetBoard() {
    this.moveCount = 0;
    //prettier-ignore
    this.board = new (require("./gameboard").default)("normal").board
    if (this.type !== "normal") {
      //prettier-ignore
      this.board = new (require("./gameboard").default)("ultimate").board;
    }
  }
}

export default gameboardManipulation;
