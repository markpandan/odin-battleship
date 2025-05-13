import "./styles.css";
import Player from "./scripts/player";

const player1 = new Player("player");
player1.autoShipPlacement([4, 4, 3, 3, 2]);

const player2 = new Player("computer");
player2.autoShipPlacement([4, 4, 3, 3, 2]);

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

function checkSunkenShips(gameBoardPlayer1, gameBoardPlayer2) {
  const checkPlayer1Ships = gameBoardPlayer1.areAllShipsSunked();
  const checkPlayer2Ships = gameBoardPlayer2.areAllShipsSunked();
  if (checkPlayer1Ships || checkPlayer2Ships) {
    if (checkPlayer1Ships) console.log("Player 2 Wins!");
    if (checkPlayer2Ships) console.log("Player 1 Wins!");

    player2GameBoard.removeEventListener("click", clickEvent);
  }
}

function clickEvent(event) {
  const targetElement = event.target;
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

  checkSunkenShips(player1.getBoard, player2.getBoard);
}

player2GameBoard.addEventListener("click", clickEvent);
