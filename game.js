class Game{
  constructor(width, height) {
    this.iteration = 0;
    this.width = width;
    this.height = height;
    this.board = new Board(width, height);
    this.player = new Player(10);
    this.playerX = 3;
    this.playerY = 5;
    this.board.board[this.playerY][this.playerX] = this.player;
    let foods = 0;
    while(foods < 4){
      let a = Math.floor(Math.random()*10);
      let b = Math.floor(Math.random()*10);
      
      if (this.board.board[a][b] == null) {
        this.board.board[a][b] = new Food();
        foods += 1;
      }
    }
    this.board.board[3][8] = new RandomEnemy();
    this.isRunning = true;
    this.won = false;
  }
  step(playerAction) {
    
    if (!this.isRunning) {
      return false;
    }
    
    const moveDirections = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1]
    ];
    const direction = moveDirections[playerAction];

    const prevPlayer = [this.playerX, this.playerY];
    const postPlayer = [this.playerX+direction[0], this.playerY+direction[1]];
    
    this.board.moveFromTo(
      prevPlayer[0], prevPlayer[1],
      postPlayer[0], postPlayer[1],
    );
    this.board.board[postPlayer[1]][postPlayer[0]].lastAction = game.iteration;
    this.playerX = postPlayer[0];
    this.playerY = postPlayer[1];
    this.player.hunger -= 1;
    if (this.player.hunger <= 0) {
      this.won = false;
      this.isRunning = false;
      return false;
    }
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.board.board[i][j] !== null && this.board.board[i][j].type.startsWith('enemy')) {
          if (this.board.board[i][j].lastAction == game.iteration) {
            continue;
          }
          const movement = this.board.board[i][j].getMovement(this, j, i);
          console.log(movement);
          const direction = moveDirections[movement];
          this.board.board[i][j].lastAction = game.iteration;
          this.board.moveFromTo(
            j, i,
            j+direction[0], i+direction[1]
          );
        }
      }
    }
    this.iteration += 1;
    if (this.iteration >= 20) {
      this.isRunning = false;
      this.won = true;
    }
    return true;
  }
  draw(draw) {
    this.board.draw(draw);
    if (!this.isRunning) {
      draw.setFillStyle('yellow');
      draw.setFontSize(200);
      draw.setTextAlign('center');
      draw.fillText('WIN!', game.width*50, game.height*50);
    }
  }

  // Functions that player can access
  getNearestFood() {
    let minDistance = 1000000;
    let nearestFoodX = -1;
    let nearestFoodY = -1;
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.board.board[i][j] != null) {
          if (this.board.board[i][j].type == 'food') {
            const distance = ((this.playerX - j) * (this.playerX - j)) + ((this.playerY - i) * (this.playerY - i));
            if (minDistance >= distance) {
              minDistance = distance;
              nearestFoodX = j;
              nearestFoodY = i;
            }
          }
        }
      }
    }
    return [nearestFoodX, nearestFoodY];
  }
}
