import Ship from "./ship";

export default class GameBoard {
  constructor(grid = 8) {
    // Creates an 8 x 8 board by default
    this.board = Array(grid)
      .fill()
      .map(() => Array(grid).fill(null));

    this._missHitDescription = "miss hit";
    this._shipHitDescription = "ship hit";
  }

  insertShip(x, y, ship, isVertical = false) {
    const length = ship.getLength;

    if (this.board.length < x + length || this.board[x].length < y + length)
      throw new Error("Ship was placed over the grid borders");

    if (!isVertical)
      this.board[x].splice(y, length, ...Array(length).fill(ship));
    else {
      for (let row = x; row < x + length; row++) this.board[row][y] = ship;
    }
  }

  // TODO: Apply the Ship.hit() method here.
  receiveAttack(x, y) {
    if (x >= this.board.length || y >= this.board[x].length)
      throw new Error("Invalid coordinates placed");

    if (this.board[x][y] instanceof Ship) {
      this.board[x][y].hit();
      this.board[x][y] = this._shipHitDescription;
    } else {
      this.board[x][y] = this._missHitDescription;
    }
  }

  areAllShipsSunked() {
    for (let row of this.board) {
      for (let cell of row) if (cell instanceof Ship) return false;
    }

    return true;
  }

  printBoard() {
    let string = "";
    this.board.forEach((row) => {
      row.forEach((cell) => {
        if (cell == this._missHitDescription) string += "? ";
        else if (cell == this._shipHitDescription) string += "X ";
        else if (cell instanceof Ship) string += "S ";
        else if (!cell) string += "- ";
      });

      string.trimEnd();
      string += "\n";
    });
    console.log(string);
  }
}
