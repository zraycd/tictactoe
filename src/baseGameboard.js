import current from ".";
class baseGameboard {
  constructor(type) {
    this.type = type;
    //prettier-ignore
    this.board = new Array(3).fill(0).map(() => new Array(3).fill(0).map(() => ""));
    if (this.type !== "normal") {
      //prettier-ignore
      this.board = this.board.map(() => new Array(3).fill(0).map(() => new (require("./gameboard").default)("normal").board));
    }
    this.moveCount = 0;
    this.lastMark = null;
    this.oldLastMark = null;
    this.winner = false;
  }

  getFocus() {
    if (current.type === "normal") {
      return this.board;
    } else {
      return this.board[this.lastMark.row][this.lastMark.col];
    }
  }
}

export default baseGameboard;
