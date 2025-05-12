import GameBoard from "./game-board";
import Ship from "./ship";

export default class Player {
  constructor(operation = "computer" || "player") {
    this.gameBoard = new GameBoard();

    if (operation == "player") {
      this.boardLength = this.gameBoard.getBoardData.length;
      this.alreadyAttackedIndexes = {};
      for (let i = 0; i < this.boardLength; i++) {
        this.alreadyAttackedIndexes[i] = Array(this.boardLength).fill();
      }
    }
  }

  createAndPlaceShip(x, y, length, isVertical = false) {
    const newShip = new Ship(length);

    this.gameBoard.insertShip(x, y, newShip, isVertical);
  }

  autoReceiveAttack(callback) {
    const attackedIndexesKeys = Object.keys(this.alreadyAttackedIndexes);
    if (!attackedIndexesKeys.length) {
      console.log("All cells have already been attacked");
      return;
    }

    const checkCellsPerRow = (row) => {
      const areAllCellsAttackedInTheRow =
        this.alreadyAttackedIndexes[row].reduce((sum, current) => {
          if (current) return sum + current;
          else return sum;
        }) === this.alreadyAttackedIndexes[row].length;

      if (areAllCellsAttackedInTheRow) delete this.alreadyAttackedIndexes[row];
    };

    let x, y;
    while (attackedIndexesKeys.length) {
      x =
        attackedIndexesKeys[
          Math.floor(Math.random() * attackedIndexesKeys.length)
        ];
      y = Math.floor(Math.random() * this.alreadyAttackedIndexes[x].length);

      if (!this.alreadyAttackedIndexes[x][y]) {
        this.gameBoard.receiveAttack(x, y, (isHit) => {
          callback(x, y, isHit);
        });

        this.alreadyAttackedIndexes[x][y] = true;
        checkCellsPerRow(x);
        break;
      }

      checkCellsPerRow(x);
    }
  }

  get getBoard() {
    return this.gameBoard;
  }
}
