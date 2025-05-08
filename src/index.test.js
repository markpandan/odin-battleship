import { Ship, GameBoard } from "./index";

const shipLength = 3;
const battleShip = new Ship(shipLength);

const grid = 8;
const gameBoard = new GameBoard(grid);

// For the Ship class
test("can detect if ships received a number of hits to be sunked", () => {
  battleShip.hitCounter = shipLength;

  expect(battleShip.isSunk()).toBe(true);
});

// For the GameBoard class
test("can place ships at specific coordinates", () => {
  const [x, y] = [3, 4];
  gameBoard.insertShip(x, y, battleShip);

  const mockBoard = Array(grid).fill(battleShip, y, y + shipLength);
  const shipOnGameBoard = Array(grid);
  shipOnGameBoard.splice(
    y,
    shipLength,
    ...gameBoard.board[x].slice(y, y + shipLength)
  );

  expect(
    mockBoard.every((element, index) => element === shipOnGameBoard[index])
  ).toBeTruthy();
});

test("can avoid placing ships at coordinates where their length passes over the horizontal grid", () => {
  const [x, y] = [3, 6];
  expect(() => gameBoard.insertShip(x, y, battleShip)).toThrow(Error);
});

test("can place ships vertically", () => {
  const [x, y] = [0, 0];
  gameBoard.insertShip(x, y, battleShip, true);

  const mockBoard = Array(grid).fill(battleShip, x, x + shipLength);
  const shipOnGameBoard = Array(grid);
  gameBoard.board.forEach((value, index) => {
    if (index >= x && index < x + shipLength) {
      shipOnGameBoard[index] = value[y];
    }
  });

  expect(
    mockBoard.every((element, index) => element === shipOnGameBoard[index])
  ).toBeTruthy();
});

test("can avoid placing ships at coordinates where their length passes over the vertical grid", () => {
  const [x, y] = [6, 0];
  expect(() => gameBoard.insertShip(x, y, battleShip, true)).toThrow(Error);
});

// test("can confirm if attacking the specific cell of the grid has a ship placed", () => {});

// test("throws an error if the coordinates of the attack is beyond the grid", () => {});
