import GameBoard from "./game-board";
import Ship from "./ship";

export default class Player {
  constructor() {
    this.gameBoard = new GameBoard();
  }

  createAndPlaceShip(x, y, length, isVertical = false) {
    const newShip = new Ship(length);

    this.gameBoard.insertShip(x, y, newShip, isVertical);
  }

  get getBoard() {
    return this.gameBoard;
  }
}
