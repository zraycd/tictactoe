class Gameb {
  constructor(type) {
    this.type = type;
    //prettier-ignore
    this.b = new Array(3).fill(0).map(() => new Array(3).fill(0).map(() => null));
    if (this.type !== "normal") {
      //prettier-ignore
      this.b = this.b.map(row => row.map(() => new Gameb("normal").b));
    }
    this.moveCount = 0;
    this.lastMark = null;
  }

  getFocus() {
    if (this.lastMark === null) {
      return this.b;
    } else {
      return this.b[this.lastMark.row][this.lastMark.col];
    }
  }

  placeMarker(row, col) {
    if (this.type === "normal") {
      this.lastMark = null;
      this.moveCount % 2 === 0
        ? (this.getFocus()[row][col] = "X")
        : (this.getFocus()[row][col] = "O");
    } else {
      if (this.moveCount === 0) {
        this.lastMark = { row: row, col: col };
      } else {
        this.moveCount % 2 === 0
          ? (this.getFocus()[row][col] = "X")
          : (this.getFocus()[row][col] = "O");
      }
    }
    this.lastMark = { row: row, col: col };
    this.moveCount++;
  }

  resetb() {
    this.moveCount = 0;
    this.type === "normal"
      ? this.b.forEach((row, rowIndex) => {
          row.forEach((col, colIndex) => {
            this.b[rowIndex][colIndex] = null;
          });
        })
      : this.b.forEach((row) => {
          row.forEach((innerb) => {
            innerb.forEach((innerRow, innerRowIndex) => {
              innerRow.forEach((cell, cellIndex) => {
                innerb[innerRowIndex][cellIndex] = null;
              });
            });
          });
        });
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
        b[x[0]][x[1]] !== null &&
        b[x[0]][x[1]] === b[y[0]][y[1]] &&
        b[x[0]][x[1]] === b[z[0]][z[1]]
      ) {
        return combination;
      }
    }

    return null;
  }
}
