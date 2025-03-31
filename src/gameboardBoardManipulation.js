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
          cell.textContent = mainCol;

          mainContainer.appendChild(cell);
          j++;
        });
      });
    } else {
      j = 0;
      this.board.forEach((mainRow) => {
        mainRow.forEach(() => {
          let container = document.createElement("div");
          container.classList.add("container");
          container.dataset.row = JSON.stringify(coordinates[j][0]);
          container.dataset.col = JSON.stringify(coordinates[j][1]);
          container.dataset.locked = JSON.stringify(true);
          container.dataset.win = JSON.stringify(false);
          mainContainer.appendChild(container);
          j++;
        });
      });
      this.controlContainers();
    }
    this.controlOpacity();
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
        container.style.opacity = "0.75";
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
          this.unlock();
        }
      }
    });
  }
  unlock() {
    document.querySelectorAll(".container").forEach((ctn) => {
      ctn.dataset.locked = "false";
    });
  }
  displayWinLine(winParams) {
    let winLine = document.querySelector(".line");

    this.finalWinner = true;
    this.winner = true;

    if (window.innerWidth < 600) {
      winParams[0] = Number((winParams[0] * 0.6589).toFixed(3));
      winParams[1] = Number((winParams[1] * 0.6589).toFixed(3));
      winParams[3] = Number(((winParams[3] / 3) * 2).toFixed(2));
    }

    this.hideBoard();
    this.displayBoard();
    winLine.style.transform = `translate(${winParams[0]}dvh, ${winParams[1]}dvh) rotate(${winParams[2]}deg) scale(1, ${winParams[3]})`;
    winLine.style.display = "block";

    document.querySelectorAll(".container").forEach((ctn) => {
      ctn.classList.remove("locked");
      ctn.classList.add("unlocked");
    });
    document.querySelectorAll(".cell").forEach((c) => {
      c.classList.remove("locked");
      c.classList.add("unlocked");
    });
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
    this.winner = null;
    this.finalWinner = null;
    document.querySelector(".line").style.display = "none";
  }
  controlOpacity() {
    document.querySelectorAll(".container").forEach((container) => {
      if (JSON.parse(container.dataset.locked)) {
        container.classList.add("locked");
      } else {
        container.classList.remove("locked");
        container.classList.add("unlocked");
      }
    });
  }
}

export default gameboardManipulation;
