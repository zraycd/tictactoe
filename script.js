class Gameboard {
  constructor(type) {
    this.type = type;
    //prettier-ignore
    this.board = new Array(3).fill(0).map(() => new Array(3).fill(0).map(() => ""));
    if (this.type !== "normal") {
      //prettier-ignore
      this.board = this.board.map(row => row.map(() => new Gameboard("normal").board));
    }
    this.moveCount = 0;
    this.lastMark = null;
    this.winner = null;
  }

  getFocus() {
    if (this.lastMark === null) {
      return this.board;
    } else {
      return this.board[this.lastMark.row][this.lastMark.col];
    }
  }

  placeMarker(row, col) {
    // try {
    if (this.type === "normal") {
      this.lastMark = null;

      if (this.getFocus()[row][col] !== "") {
        return;
      }

      this.moveCount % 2 === 0
        ? (this.getFocus()[row][col] = "X")
        : (this.getFocus()[row][col] = "O");
    } else if (this.moveCount === 0) {
      this.lastMark = { row: row, col: col };
    } else if (this.getFocus()[row][col] !== "") {
      return;
    } else {
      this.moveCount % 2 === 1
        ? (this.getFocus()[row][col] = "X")
        : (this.getFocus()[row][col] = "O");
    }
    this.hideBoard();
    this.displayBoard();
    this.moveCount++;
    let winCheckUlt;
    try {
      //prettier-ignore
      winCheckUlt = this.checkForWin(this.board[this.lastMark.row][this.lastMark.col])
    } catch {
      winCheckUlt = null;
    }

    if (winCheckUlt !== null) {
      this.hideBoard();
      this.displayBoard();
      let i = this.board[this.lastMark.row][this.lastMark.col];
      //prettier-ignore
      this.board[this.lastMark.row][this.lastMark.col] = i[winCheckUlt[0][0]][winCheckUlt[0][1]];
    }
    if (this.checkForWin(this.board) !== null) {
      let i = this.checkForWin(this.board);
      this.winner = i;
      this.hideBoard();
      this.displayBoard();
      this.board = this.board[i[0][0]][i[0][1]];
      return;
    }
    this.lastMark = { row: row, col: col };
    console.log("change");

    // } catch {
    //   return;
    // }
  }

  resetBoard() {
    this.moveCount = 0;
    //prettier-ignore
    this.board = new Array(3).fill(0).map(() => new Array(3).fill(0).map(() => ""))
    if (this.type !== "normal") {
      //prettier-ignore
      this.board = this.board.map(row => row.map(() => new Gameboard("normal").board));
    }
  }

  checkForWin(b) {
    // prettier-ignore
    const winningCombinations = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]]
    ];

    for (let combination of winningCombinations) {
      const [x, y, z] = combination;
      if (
        b[x[0]][x[1]] !== "" &&
        b[x[0]][x[1]] === b[y[0]][y[1]] &&
        b[x[0]][x[1]] === b[z[0]][z[1]]
      ) {
        return combination;
      }
    }

    return null;
  }
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
        mainRow.forEach((mainCol) => {
          let container = document.createElement("div");
          container.classList.add("container");
          container.dataset.coordinates = JSON.stringify(coordinates[j]);
          mainContainer.appendChild(container);
          j++;
        });
      });

      document.querySelectorAll(".container").forEach((container) => {
        let i = new Gameboard("normal");
        i.board = this.board;
        i.displayBoard(container);
      });
    }
  }
  hideBoard() {
    document.querySelectorAll(".container").forEach((ctn) => ctn.remove());
    document.querySelectorAll(".cell").forEach((cell) => cell.remove());
  }
}
const normalBtn = document.querySelector("#normalBtn");
const ultimateBtn = document.querySelector("#ultimateBtn");
const resetBtn = document.querySelector("#resetBtn");

const normalGame = new Gameboard("normal");
const ultimateGame = new Gameboard("ultimate");

let current;

normalGame.displayBoard();
current = normalGame;

normalBtn.addEventListener("click", () => {
  current = normalGame;
  ultimateGame.hideBoard();
  normalGame.displayBoard();
});

ultimateBtn.addEventListener("click", () => {
  current = ultimateGame;
  normalGame.hideBoard();
  ultimateGame.displayBoard();
});

resetBtn.addEventListener("click", () => {
  current.resetBoard();
  current.hideBoard();
  current.displayBoard();
});

document.querySelector(".mainContainer").addEventListener("click", (event) => {
  handleClick(event.target);
  console.log(event.target);
});

function handleClick(target) {
  let coordinates;
  if (current.type === "normal" || current.moveCount > 0) {
    coordinates = JSON.parse(target.getAttribute("data-coordinates"));
  } else {
    coordinates = JSON.parse(
      target.parentElement.getAttribute("data-coordinates")
    );
  }
  current.placeMarker(coordinates[0], coordinates[1]);
  current.hideBoard();
  current.displayBoard();
}
