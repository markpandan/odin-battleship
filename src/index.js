export class Ship {
  constructor(length) {
    this.length = length;
    this.hitCounter = 0;
  }

  hit() {
    this.hitCounter++;
  }

  isSunk() {
    return this.length >= this.hitCounter ? true : false;
  }

  get getLength() {
    return this.length;
  }
}

export class GameBoard {
  constructor(grid = 8) {
    // Creates an 8 x 8 board by default
    this.board = Array(grid)
      .fill()
      .map(() => Array(grid).fill(null));
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

  receiveAttack(x, y) {}
}

class Player {}
