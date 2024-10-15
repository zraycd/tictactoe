import baseGameboard from "./baseGameboard";

class gameboardPlace extends baseGameboard {
  placeMarker(row, col, container, marker, ctnRow = null, ctnCol = null) {
    if (container[row][col] === "") {
      container[row][col] = marker;
      // this.oldLastMark = this.lastMark;

      this.lastMark = { row: row, col: col };
      this.checkForWin(container, ctnRow, ctnCol);
    } else {
      return;
    }
    this.moveCount++;
  }

  checkForWin(b, row, col) {
    // prettier-ignore
    const winningCombinations = [
        [[0, 0], [0, 1], [0, 2], [0, -25, 90, 1]],
        [[1, 0], [1, 1], [1, 2], [0, 0, 90, 1]],
        [[2, 0], [2, 1], [2, 2], [0, 25, 90, 1]],
        
        [[0, 0], [1, 0], [2, 0], [-25, 0, 0, 1]],
        [[0, 1], [1, 1], [2, 1], [0, 0, 0, 1]],
        [[0, 2], [1, 2], [2, 2], [25, 0, 0, 1]],
        
        [[0, 0], [1, 1], [2, 2], [0, 0, -45, 1.25]],
        [[0, 2], [1, 1], [2, 0], [0, 0, 45, 1.25]]
      ];

    for (let combination of winningCombinations) {
      let tempComb = combination.slice(0, -1);
      const [x, y, z] = tempComb;
      if (
        b[x[0]][x[1]] !== "" &&
        b[x[0]][x[1]] === b[y[0]][y[1]] &&
        b[x[0]][x[1]] === b[z[0]][z[1]]
      ) {
        if (this.type !== "normal" && !this.finalWinner && this.board[row]) {
          this.board[row][col] = this.board[row][col][x[0]][x[1]];
          this.displayWinLine();
        }
        if (this.type === "normal" && !this.winner) {
          this.winner = b[x[0]][x[1]];
          this.displayWinLine();
        }

        return combination;
      }
    }
    this.hideBoard();
    this.displayBoard();
    return null;
  }
}

export default gameboardPlace;
