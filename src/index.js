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
}

export class GameBoard {
  constructor(grid = 8) {
    // Creates an 8 x 8 board by default
    this.board = Array(grid)
      .fill()
      .map(() => Array(grid).fill(null));
  }

  insertShip(x, y, ship) {}

  receiveAttack(x, y) {}
}

class Player {}
