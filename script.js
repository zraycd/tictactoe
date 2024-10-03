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
}
