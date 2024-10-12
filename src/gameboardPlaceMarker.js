import baseGameboard from "./baseGameboard";

class gameboardPlace extends baseGameboard {
  placeMarker(row, col, container, marker) {
    if (container[row][col] === "") {
      container[row][col] = marker;
      this.checkForWin(container);
    } else {
      return;
    }

    // if (this.lastMark === null) {
    //   container[row][col] = marker
    // }

    this.moveCount++;
    this.lastMark = { row: row, col: col };
  }

  checkForWin(b) {
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
        if (this.type !== "normal") {
          this.board = b[x[0]][x[1]];
        }
        this.winner = b[x[0]][x[1]];
        console.log(b);
        this.hideBoard();
        this.displayBoard(undefined, combination[3]);

        return combination;
      }
    }
    this.hideBoard();
    this.displayBoard();
    return null;
  }
}

export default gameboardPlace;
