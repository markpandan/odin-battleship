import "./styles.css";
import Player from "./scripts/player";

const gridSize = 8;

const player1 = new Player();
const player2 = new Player();
player1.createAndPlaceShip(3, 3, 4);
player1.createAndPlaceShip(4, 4, 2);

player2.createAndPlaceShip(4, 4, 2);
player2.createAndPlaceShip(5, 5, 3, true);
player2.createAndPlaceShip(0, 0, 5, true);

const players = [player1, player2];

const gameBoards = document.querySelectorAll(".game-board");
gameBoards.forEach((gameBoard, index) => {
  const battleBoard = players[index].getBoard;
  battleBoard.printEveryBoardCells((cell) => {
    const block = document.createElement("div");
    block.classList.add("block");
    block.textContent = cell;
    block.addEventListener("click", () => {});

    gameBoard.appendChild(block);
  });
});
