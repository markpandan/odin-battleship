import Ship from "./ship";

export default class GameBoard {
  constructor(grid = 8) {
    // Creates an 8 x 8 board by default
    this._board = Array(grid)
      .fill()
      .map(() => Array(grid).fill(null));

    this._missHitDescription = "miss hit";
    this._shipHitDescription = "ship hit";
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

  // TODO: Apply the Ship.hit() method here.
  receiveAttack(x, y) {
    if (x >= this._board.length || y >= this._board[x].length)
      throw new Error("Invalid coordinates placed");

    if (this._board[x][y] instanceof Ship) {
      this._board[x][y].hit();
      this._board[x][y] = this._shipHitDescription;
    } else {
      this._board[x][y] = this._missHitDescription;
    }
  }

  areAllShipsSunked() {
    for (let row of this._board) {
      for (let cell of row) if (cell instanceof Ship) return false;
    }

    return true;
  }

  #printCell(cell) {
    if (cell == this._missHitDescription) return "?";
    else if (cell == this._shipHitDescription) return "X";
    else if (cell instanceof Ship) return "S";
    else if (!cell) return "-";
  }

  printEveryBoardCells(callback) {
    this._board.forEach((row) => {
      row.forEach((cell) => {
        callback(this.#printCell(cell));
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
