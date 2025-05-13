import GameBoard from "./game-board";
import Ship from "./ship";

export default class Player {
  constructor(operation = "computer" || "player") {
    this.gameBoard = new GameBoard();
    this.boardLength = this.gameBoard.getBoardData.length;

    if (operation == "player") {
      this.availableAttackCells = {};
      for (let i = 0; i < this.boardLength; i++) {
        this.availableAttackCells[i] = [...Array(this.boardLength).keys()];
      }
    }
  }

  get getBoard() {
    return this.gameBoard;
  }

  createAndPlaceShip(x, y, length, isVertical = false) {
    const newShip = new Ship(length);

    this.gameBoard.insertShip(x, y, newShip, isVertical);
  }

  autoShipPlacement(shipLengths) {
    let x, y, newShip, isVertical;

    let shipLengthIndex = 0;
    while (shipLengthIndex < shipLengths.length) {
      newShip = new Ship(shipLengths[shipLengthIndex]);
      x = Math.floor(Math.random() * this.boardLength);
      y = Math.floor(Math.random() * this.boardLength);
      isVertical = Math.floor(Math.random() * 2);

      console.log(`${x}, ${y}, ${isVertical}`);
      if (!this.gameBoard.insertShip(x, y, newShip, isVertical)) continue;

      shipLengthIndex++;
    }
  }

  autoReceiveAttack(callback) {
    const attackedIndexesKeys = Object.keys(this.availableAttackCells);
    if (!attackedIndexesKeys.length) {
      console.log("All cells have already been attacked");
      return;
    }

    const x =
      attackedIndexesKeys[
        Math.floor(Math.random() * attackedIndexesKeys.length)
      ];

    const selectedColumn = Math.floor(
      Math.random() * this.availableAttackCells[x].length
    );
    const y = this.availableAttackCells[x][selectedColumn];

    this.gameBoard.receiveAttack(x, y, (isHit) => {
      callback(x, y, isHit);
    });

    this.availableAttackCells[x].splice(selectedColumn, 1);
    if (this.availableAttackCells[x].length === 0)
      delete this.availableAttackCells[x];
  }
}
