import baseGameboard from "./baseGameboard";

class gameboardPlace extends baseGameboard {
  placeMarker(row, col) {
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

    this.type === "normal"
      ? this.checkForWin(this.board)
      : this.checkForWin(this.board[this.lastMark.row][this.lastMark.col]);
    this.lastMark = { row: row, col: col };
    console.log("change");
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
        this.hideBoard();
        this.displayBoard();

        this.board = b[x[0]][x[1]];
        return combination;
      }
    }

    return null;
  }
}

export default gameboardPlace;
