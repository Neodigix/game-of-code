class Draw{
  constructor(canvas, ctx, boardWidth=10) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.scale = 1;
    this.fillStyle = 'black';
    this.boardWidth = boardWidth;
    this.dim = boardWidth * 100;
  }
  setFillStyle(style) {
    this.ctx.fillStyle = style;
  }
  setStrokeStyle(style) {
    this.ctx.strokeStyle = style;
  }
  fillRect(x, y, width, height) {
    this.ctx.fillRect(
      x * this.scale,
      ((this.dim - (y+100)) * this.scale),
      width*this.scale,
      height*this.scale
    );
  }
  fillText(text, x, y) {
    this.ctx.fillText(text, x * this.scale, (this.dim - y) * this.scale);
  }
  setTextAlign(align) {
    this.ctx.textAlign = align;
  }
  setFontSize(size) {
    this.ctx.font = (size * this.scale) + 'px Arial';
  }
  updateScale(canvasContainer) {
    const containerWidth = canvasContainer.clientWidth;
    this.canvas.width = containerWidth;
    this.canvas.height = containerWidth;
    this.scale = containerWidth/(this.boardWidth*100);
  }
}