class Player extends GameObject{
  constructor(hunger=0) {
    super('player');
    this.hunger = hunger;
  }
  isAlive() {
    return this.hunger > 0;
  }
  draw(draw, x, y) {
    draw.setFillStyle('blue');
    draw.fillRect(x * 100, y * 100, 100, 100);
    draw.setFillStyle('white');
    draw.setFontSize(50);
    draw.setTextAlign('center');
    draw.fillText(this.hunger, x * 100 + 50, y * 100 + 50);
  }
}