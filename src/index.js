import "./styles.css";
import Player from "./scripts/player";

let player1, player2;
let players = [];
const [player1GameBoard, player2GameBoard] =
  document.querySelectorAll(".game-board");

function init() {
  player1 = new Player("player");
  player1.autoShipPlacement([4, 4, 3, 3, 2]);

  player2 = new Player("computer");
  player2.autoShipPlacement([4, 4, 3, 3, 2]);

  players = [player1, player2];

  displayCells();
}

function displayCells() {
  [player1GameBoard, player2GameBoard].forEach((gameBoard, index) => {
    const battleBoard = players[index].getBoard;
    battleBoard.printEveryBoardCells((cell, x, y) => {
      const block = document.createElement("div");
      block.classList.add("block");

      if (index == 0) block.textContent = cell;
      block.dataset.row = x;
      block.dataset.column = y;

      gameBoard.appendChild(block);
    });
  });
}

init();

function restartGame() {
  player1GameBoard.textContent = "";
  player2GameBoard.textContent = "";

  player2GameBoard.addEventListener("click", clickEvent);
  description.textContent = "";

  init();
}

function changeBlockState(targetElement, isHit) {
  if (isHit) targetElement.style.backgroundColor = "red";
  else targetElement.style.backgroundColor = "grey";
}

function checkSunkenShips(gameBoardPlayer1, gameBoardPlayer2) {
  const checkPlayer1Ships = gameBoardPlayer1.areAllShipsSunked();
  const checkPlayer2Ships = gameBoardPlayer2.areAllShipsSunked();
  if (checkPlayer1Ships || checkPlayer2Ships) {
    let text = document.createElement("p");

    if (checkPlayer1Ships) text.textContent = "Player 2 Wins!";
    if (checkPlayer2Ships) text.textContent = "Player 1 Wins!";

    description.appendChild(text);

    const btnRestart = document.createElement("button");
    btnRestart.textContent = "Play Again";
    description.appendChild(btnRestart);

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

const description = document.querySelector(".description");
description.addEventListener("click", restartGame);
