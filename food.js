class Food extends GameObject{
  constructor() {
    super('food');
  }
  draw(draw, x, y) {
    draw.setFillStyle('green');
    draw.fillRect(x * 100, y * 100, 100, 100);
  }
}
