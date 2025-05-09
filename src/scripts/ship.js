export default class Ship {
  constructor(length) {
    this.length = length;
    this.hitCounter = 0;
  }

  hit() {
    this.hitCounter++;
  }

  isSunk() {
    return this.length >= this.hitCounter ? true : false;
  }

  get getLength() {
    return this.length;
  }
}
