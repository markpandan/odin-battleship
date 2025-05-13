import GameBoard from "./scripts/game-board";
import Ship from "./scripts/ship";
// import Player from "./scripts/player";

const shipLength = 3;
const battleShip = new Ship(shipLength);

const grid = 8;
const gameBoard = new GameBoard(grid);

// [x, y, isVertical]
const validShipStartCoordinates = [
  [3, 4, false],
  [0, 0, true],
  [5, 2, true],
];

// For the Ship class
test("can detect if ships received a number of hits to be sunked", () => {
  battleShip.hitCounter = shipLength;

  expect(battleShip.isSunk()).toBe(true);
});

// For the GameBoard class
test("can place ships at specific coordinates", () => {
  const [x, y, isVertical] = validShipStartCoordinates[0];
  gameBoard.insertShip(x, y, battleShip, isVertical);

  const mockBoard = Array(grid).fill(battleShip, y, y + shipLength);
  const shipOnGameBoard = Array(grid);
  shipOnGameBoard.splice(
    y,
    shipLength,
    ...gameBoard.getBoardData[x].slice(y, y + shipLength)
  );

  expect(
    mockBoard.every((element, index) => element === shipOnGameBoard[index])
  ).toBeTruthy();
});

test("can avoid placing ships at coordinates where their length passes over the horizontal grid", () => {
  const [x, y] = [3, 6];

  expect(gameBoard.insertShip(x, y, battleShip)).toBeFalsy();
});

test("can place ships vertically", () => {
  const [x, y, isVertical] = validShipStartCoordinates[1];
  gameBoard.insertShip(x, y, battleShip, isVertical);

  const mockBoard = Array(grid).fill(battleShip, x, x + shipLength);
  const shipOnGameBoard = Array(grid);
  gameBoard.getBoardData.forEach((value, index) => {
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
  expect(gameBoard.insertShip(x, y, battleShip, true)).toBeFalsy();
});

test("can avoid collisions when placing ships", () => {
  gameBoard.insertShip(5, 2, battleShip, true);

  expect(gameBoard.insertShip(7, 2, battleShip)).toBeFalsy();
});

test("can confirm if attacking the specific cell of the grid has a ship placed", () => {
  const [x, y] = [3, 4];
  gameBoard.receiveAttack(x, y);

  expect(gameBoard.getBoardData[x][y]).toBe(gameBoard.SHIP_HIT_DESCRIPTION);
});

test("can detect if attacking the specific cell can show a miss hit", () => {
  const [x, y] = [5, 5];
  gameBoard.receiveAttack(x, y);

  expect(gameBoard.getBoardData[x][y]).toBe(gameBoard.MISS_HIT_DESCRIPTION);
});

test("will not overwrite the map or invoke a callback if the specific cell has been attacked before", () => {
  const [x, y, _] = validShipStartCoordinates[0];
  const mockCallback = jest.fn();

  gameBoard.receiveAttack(x, y + 1, mockCallback);
  expect(mockCallback.mock.calls).toHaveLength(1);

  gameBoard.receiveAttack(x, y + 1, mockCallback);
  expect(mockCallback.mock.calls).toHaveLength(1);
});

test("throws an error if the coordinates of the attack is beyond the grid", () => {
  const [x, y] = [grid, grid + 1];
  expect(() => gameBoard.receiveAttack(x, y)).toThrow(Error);
});

test("can detect if all of the ships inside the game board has already been sunked", () => {
  expect(gameBoard.areAllShipsSunked()).toBeFalsy();

  validShipStartCoordinates.forEach(([x, y, isVertical]) => {
    if (isVertical)
      for (let row = x; row < x + shipLength; row++)
        gameBoard.receiveAttack(row, y);
    else
      for (let column = y; column < y + shipLength; column++)
        gameBoard.receiveAttack(x, column);
  });

  expect(gameBoard.areAllShipsSunked()).toBeTruthy();
});

gameBoard.printBoard();
