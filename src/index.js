import "./styles.css";
import Player from "./scripts/player";

const player1 = new Player("player");

player1.createAndPlaceShip(3, 3, 4);
player1.createAndPlaceShip(4, 4, 2);
player1.createAndPlaceShip(0, 1, 5, true);

const player2 = new Player("computer");
player2.createAndPlaceShip(4, 4, 3);
player2.createAndPlaceShip(5, 5, 3, true);
player2.createAndPlaceShip(0, 0, 5, true);

const players = [player1, player2];

const [player1GameBoard, player2GameBoard] =
  document.querySelectorAll(".game-board");

[player1GameBoard, player2GameBoard].forEach((gameBoard, index) => {
  const battleBoard = players[index].getBoard;
  battleBoard.printEveryBoardCells((cell, x, y) => {
    const block = document.createElement("div");
    block.classList.add("block");
    block.textContent = cell;
    block.dataset.row = x;
    block.dataset.column = y;

    gameBoard.appendChild(block);
  });
});

function changeBlockState(targetElement, isHit) {
  if (isHit) targetElement.style.backgroundColor = "red";
  else targetElement.style.backgroundColor = "grey";
}

player2GameBoard.addEventListener("click", (e) => {
  const targetElement = e.target;
  if (targetElement.className === player2GameBoard.className) {
    console.log("Invalid Selection");
    return;
  }

  const dataset = targetElement.dataset;
  player2.getBoard.receiveAttack(dataset.row, dataset.column, (isHit) => {
    changeBlockState(targetElement, isHit);

    player1.autoReceiveAttack((x, y, isHit) => {
      const targetElement = document.querySelector(
        `.player-1-container .block[data-row="${x}"][data-column="${y}"]`
      );
      changeBlockState(targetElement, isHit);
    });
  });
});
