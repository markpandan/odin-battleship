import Ship from "./ship";

export default class GameBoard {
  constructor(grid = 8) {
    // Creates an 8 x 8 board by default
    this._board = Array(grid)
      .fill()
      .map(() => Array(grid).fill(null));

    this.missHitDescription = "?";
    this.shipHitDescription = "X";
  }

  get getBoardData() {
    return this._board;
  }

  insertShip(x, y, ship, isVertical = false) {
    const length = ship.getLength;

    if (this._board.length < x + length || this._board[x].length < y + length)
      throw new Error("Ship was placed over the grid borders");

    if (!isVertical)
      this._board[x].splice(y, length, ...Array(length).fill(ship));
    else {
      for (let row = x; row < x + length; row++) this._board[row][y] = ship;
    }
  }

  receiveAttack(x, y, callback) {
    if (x >= this._board.length || y >= this._board[x].length)
      throw new Error("Invalid coordinates placed");

    let isHit = false;
    if (this._board[x][y] instanceof Ship) {
      this._board[x][y].hit();
      this._board[x][y] = this.shipHitDescription;
      isHit = true;
    } else if (!this._board[x][y]) {
      this._board[x][y] = this.missHitDescription;
    } else if (
      this._board[x][y] === this.missHitDescription ||
      this._board[x][y] === this.shipHitDescription
    ) {
      return;
    } else {
      throw new Error("Invalid Value");
    }

    if (callback) callback(isHit);
  }

  areAllShipsSunked() {
    for (let row of this._board) {
      for (let cell of row) if (cell instanceof Ship) return false;
    }

    return true;
  }

  #printCell(cell) {
    if (cell instanceof Ship) return "S";
    else if (!cell) return "-";
    else return cell;
  }

  printEveryBoardCells(callback) {
    this._board.forEach((row, x) => {
      row.forEach((cell, y) => {
        callback(this.#printCell(cell), x, y);
      });
    });
  }

  printBoard() {
    let string = "";
    this._board.forEach((row) => {
      row.forEach((cell) => {
        string += this.#printCell(cell) + " ";
      });

      string.trimEnd();
      string += "\n";
    });
    console.log(string);
  }
}
