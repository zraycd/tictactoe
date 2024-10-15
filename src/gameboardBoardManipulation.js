import gameboardPlace from "./gameboardPlaceMarker";

class gameboardManipulation extends gameboardPlace {
  displayBoard(
    mainContainer = document.querySelector(".mainContainer"),
    winParams = []
  ) {
    // if (typeof this.board === typeof "") {
    //   let tempDiv = document.createElement("div");
    //   tempDiv.classList.add("cell");
    //   tempDiv.textContent = this.board;
    //   document.querySelector(".mainContainer").appendChild(tempDiv);
    //   return;
    // }
    //prettier-ignore
    const coordinates = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
    let j = 0;

    if (this.type === "normal") {
      this.board.forEach((mainRow) => {
        mainRow.forEach((mainCol) => {
          let cell = document.createElement("div");
          cell.classList.add("cell");
          cell.dataset.coordinates = JSON.stringify(coordinates[j]);
          // typeof mainCol === typeof ""
          //   ? (cell.textContent = mainCol)
          //   : (cell.textContent =
          //       mainCol[coordinates[j][0]][coordinates[j][1]]);
          cell.textContent = mainCol;

          mainContainer.appendChild(cell);
          j++;
        });
      });
    } else {
      j = 0;
      this.board.forEach((mainRow) => {
        mainRow.forEach((mainCol) => {
          // if (typeof mainCol === typeof "") {
          //   let tempDiv = document.createElement("div");
          //   tempDiv.textContent = mainCol;
          // } else {
          let container = document.createElement("div");
          container.classList.add("container");
          container.dataset.row = JSON.stringify(coordinates[j][0]);
          container.dataset.col = JSON.stringify(coordinates[j][1]);
          container.dataset.locked = JSON.stringify(true);
          container.dataset.win = JSON.stringify(false);
          mainContainer.appendChild(container);
          j++;
          // }
        });
      });
      this.controlContainers();
    }
  }
  controlContainers(
    containers = document.querySelectorAll(".container"),
    appendCells = true
  ) {
    let tempMark = this.lastMark;
    containers.forEach((container) => {
      let i = new (require("./gameboard").default)("normal");
      i.board = this.board[container.dataset.row][container.dataset.col];

      if (typeof i.board === typeof "") {
        container.textContent = i.board;
        container.dataset.win = "true";
        container.classList.remove("container");
        container.classList.add("cell");
      } else if (appendCells) {
        i.displayBoard(container);
      }

      if (tempMark === null) {
        container.dataset.locked = "false";
      } else {
        container.dataset.locked = "true";
        //prettier-ignore
        let matchesRow = JSON.parse(container.dataset.row) === tempMark.row;
        //prettier-ignore
        let matchesCol = JSON.parse(container.dataset.col) === tempMark.col;

        let isWon = JSON.parse(container.dataset.win);

        if (matchesRow && matchesCol && !isWon) {
          container.dataset.locked = "false";
        }

        if (matchesRow && matchesCol && isWon) {
          tempMark = null;
          this.controlContainers(undefined, false);
        }
      }
    });
  }
  displayWinLine(container = document.querySelector(".mainContainer")) {
    let winParams = this.checkForWin(this.board);
    if (winParams) {
      winParams = winParams[3];
    } else {
      return;
    }
    this.controlContainers(undefined, false);
    let cellAmount = 0;
    container.childNodes.forEach((node) => {
      if (node.classList !== undefined && node.classList[0] === "cell") {
        cellAmount++;
      }
    });
    console.log(cellAmount);
    if (cellAmount > 2) {
      let winLine = document.querySelector(".line");

      winLine.style.transform = `translate(${winParams[0]}vh, ${winParams[1]}vh) rotate(${winParams[2]}deg) scale(1, ${winParams[3]})`;
      winLine.style.display = "block";

      this.finalWinner = true;
    }
  }

  hideBoard(board = document.querySelector(".mainContainer")) {
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
      this.lastMark = null;
    }
    document.querySelector(".line").style.display = "none";
  }
}

export default gameboardManipulation;

// at the start of the game lastMark = null
// if lastMark is null, unlock every container
// if lastMark isnt null, lock every container, except the one that matches lastMark coordinates
// if lastMark coordinates match the coordinates of a container that has been won already, unlock every other container
// if container is won, lock it
