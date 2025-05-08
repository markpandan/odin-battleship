import { Ship, GameBoard } from "./index";

// For the Ship class
test("can detect if ships received a number of hits to be sunked", () => {
  const length = 3;
  const battleShip = new Ship(length);
  battleShip.hitCounter = 3;

  expect(battleShip.isSunk()).toBe(true);
});

// For the GameBoard class
test("can place ships at specific coordinates", () => {
  const battleShip = new Ship(3);
  const gameboard = new GameBoard();
  gameboard.insertShip(3, 4, battleShip);
});

test("can avoid placing ships at coordinates where their length passes over the border", () => {});

test("can place ships vertically", () => {});

test("can confirm if attacking the specific cell of the grid has a ship placed", () => {});

test("throws an error if the coordinates of the attack is beyond the grid", () => {});

test();
