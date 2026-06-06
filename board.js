class Board{
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = [];
    this.initEmpty();
  }
  initEmpty() {
    for (let i = 0; i < this.width; i++){
      this.board.push([]);
      for (let j = 0; j < this.height; j++) {
        this.board[i].push(null);
      }
    }
  }
  moveFromTo(prevX, prevY, x, y) {
    const obj = this.board[prevY][prevX];
    this.board[prevY][prevX] = null;
    this.board[y][x] = obj;
  }
  draw(draw) {
    draw.setFillStyle('white');
    draw.fillRect(0, 0, this.width * 100, this.width * 100);
    for (let i = 0; i < this.height; i++){
      for (let j = 0; j < this.width; j++) {
        if (this.board[i][j] != null) {
          this.board[i][j].draw(draw, j, i);
        }
        else {
          if ((i + j) % 2) {
            draw.setFillStyle('grey');
          }
          else {
            draw.setFillStyle('lightgrey');
          }
          draw.fillRect(j * 100, i * 100, 100, 100);
        }
      }
    }
  }
}
