class RandomEnemy extends GameObject{
  constructor(hunger=0) {
    super('enemy-random');
  }
  draw(draw, x, y) {
    draw.setFillStyle('red');
    draw.fillRect(x * 100, y * 100, 100, 100);
  }
  getMovement(board, x, y) {
    return Math.floor(Math.random() * 4);
  }
}
