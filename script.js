class Gameboard {
  constructor(type) {
    this.type = type;
    //prettier-ignore
    this.board = new Array(3).fill(0).map(() => new Array(3).fill(0).map(() => null));
    if (this.type !== "normal") {
      //prettier-ignore
      this.board = this.board.map(row => row.map(() => new Gameboard("normal").board));
    }
    this.moveCount = 0;
    this.lastMark = null;
  }

  getFocus() {
    if (this.lastMark === null) {
      return this.board;
    } else {
      return this.board[this.lastMark.row][this.lastMark.col];
    }
  }

  placeMarker(row, col) {
    if (this.type === "normal") {
      this.lastMark = null;

      if (this.getFocus()[row][col] !== null) {
        return;
      }

      this.moveCount % 2 === 0
        ? (this.getFocus()[row][col] = "X")
        : (this.getFocus()[row][col] = "O");
    } else if (this.moveCount === 0) {
      this.lastMark = { row: row, col: col };
    } else if (this.getFocus()[row][col] !== null) {
      return;
    } else {
      this.moveCount % 2 === 1
        ? (this.getFocus()[row][col] = "X")
        : (this.getFocus()[row][col] = "O");
    }

    this.moveCount++;
    let winCheckUlt;
    try {
      //prettier-ignore
      winCheckUlt = this.checkForWin(this.board[this.lastMark.row][this.lastMark.col])
    } catch {
      winCheckUlt = null;
    }

    if (winCheckUlt !== null) {
      let i = this.board[this.lastMark.row][this.lastMark.col];
      //prettier-ignore
      this.board[this.lastMark.row][this.lastMark.col] = i[winCheckUlt[0][0]][winCheckUlt[0][1]];
    }
    if (this.checkForWin(this.board) !== null) {
      let i = this.checkForWin(this.board);
      this.board = this.board[i[0][0]][i[0][1]];
      return `${this.board} wins`;
    }

    this.lastMark = { row: row, col: col };
  }

  resetBoard() {
    this.moveCount = 0;
    //prettier-ignore
    this.board = new Array(3).fill(0).map(() => new Array(3).fill(0).map(() => null))
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
