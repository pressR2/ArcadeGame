'use strict';

const TILE_STONE = 'tileStone';
const TILE_WATER = 'tileWater';
const TILE_GRASS = 'tileGrass';
const TILE_ROCK = 'tileRock';
const TILE_SELECTOR = 'tileSelector';
const TILE_BUG = 'tileBug';
const TILE_WHITE = 'tileWhite';

const GS_TITLE = 'gameTitle';
const GS_INSTRUCTIONS = 'gameInstructions';
const GS_START = 'gameStart';
const GS_WIN = 'gameWin';
let gameState = GS_TITLE;
let menu = 1;

const LV_1 = 'level 1';
const LV_2 = 'level 2';
let levelState = LV_1;
var levelEnd = false;

let boardGame = [];
const FREQUENCY = 100;
let blinking = false;

const Indextile = function(tileType, otherTileOn) {
  this.otherTileOn = otherTileOn;
  this.tileType = tileType;
};

fillArray();

function fillArray() {
  let rowAmount = 10;
  let colAmount = 9;

  for (let row = 0; row < rowAmount; row++) {
    let rowTable = [];
    for (let col = 0; col < colAmount; col++) {
      if ([0].includes(row)) {
        rowTable.push(new Indextile(TILE_WHITE));
      }
      if ([1, 5].includes(row)) {
        rowTable.push(new Indextile(TILE_WATER));
      }
      if ([2, 3, 4, 6, 7].includes(row)) {
        rowTable.push(new Indextile(TILE_STONE));
      }
      if ([8, 9].includes(row)) {
        rowTable.push(new Indextile(TILE_GRASS));
      }
    }
    boardGame.push(rowTable);
  }
  boardGame[5][3] = new Indextile(TILE_STONE);
  boardGame[2][7].otherTileOn = TILE_SELECTOR;
  boardGame[2][2].otherTileOn = TILE_BUG;
  boardGame[7][3].otherTileOn = TILE_ROCK;
  boardGame[3][3].otherTileOn = TILE_ROCK;
  boardGame[4][5].otherTileOn = TILE_ROCK;
  boardGame[2][4].otherTileOn = TILE_ROCK;
}

function fillArray2() {
  let rowAmount = 10;
  let colAmount = 9;
  for (let row = 0; row < rowAmount; row++) {
    let rowTable = [];
    for (let col = 0; col < colAmount; col++) {
      if ([0].includes(row)) {
        rowTable.push(new Indextile(TILE_WHITE));
      }
      if ([1, 2].includes(row)) {
        rowTable.push(new Indextile(TILE_WATER));
      }
      if ([4, 5, 6, 7, 8].includes(row)) {
        rowTable.push(new Indextile(TILE_GRASS));
      }
      if ([3, 9].includes(row)) {
        rowTable.push(new Indextile(TILE_STONE));
      }
    }
    boardGame.push(rowTable);
  }
  boardGame[2][1] = new Indextile(TILE_STONE);
  boardGame[2][5] = new Indextile(TILE_STONE);
  boardGame[6][3].otherTileOn = TILE_SELECTOR;
  boardGame[2][1].otherTileOn = TILE_BUG;

  boardGame[8][5].otherTileOn = TILE_ROCK;
  boardGame[8][6].otherTileOn = TILE_ROCK;
  boardGame[8][8].otherTileOn = TILE_ROCK;
  boardGame[6][8].otherTileOn = TILE_ROCK;
  boardGame[6][6].otherTileOn = TILE_ROCK;
  boardGame[6][7].otherTileOn = TILE_ROCK;
  boardGame[5][8].otherTileOn = TILE_ROCK;
  boardGame[7][8].otherTileOn = TILE_ROCK;
  boardGame[4][8].otherTileOn = TILE_ROCK;
  boardGame[4][5].otherTileOn = TILE_ROCK;
  boardGame[4][6].otherTileOn = TILE_ROCK;
  boardGame[4][8].otherTileOn = TILE_ROCK;
  boardGame[3][8].otherTileOn = TILE_ROCK;
  boardGame[4][4].otherTileOn = TILE_ROCK;
  boardGame[5][4].otherTileOn = TILE_ROCK;
  boardGame[6][4].otherTileOn = TILE_ROCK;
  boardGame[7][4].otherTileOn = TILE_ROCK;
  boardGame[8][4].otherTileOn = TILE_ROCK;
  boardGame[8][0].otherTileOn = TILE_ROCK;
  boardGame[8][1].otherTileOn = TILE_ROCK;
  boardGame[8][2].otherTileOn = TILE_ROCK;
  boardGame[4][0].otherTileOn = TILE_ROCK;
  boardGame[5][0].otherTileOn = TILE_ROCK;
  boardGame[6][0].otherTileOn = TILE_ROCK;
  boardGame[7][0].otherTileOn = TILE_ROCK;
  boardGame[8][0].otherTileOn = TILE_ROCK;
  boardGame[4][3].otherTileOn = TILE_ROCK;
  boardGame[4][1].otherTileOn = TILE_ROCK;
  boardGame[5][3].otherTileOn = TILE_ROCK;
  boardGame[6][2].otherTileOn = TILE_ROCK;
  boardGame[3][0].otherTileOn = TILE_ROCK;
  boardGame[8][3].otherTileOn = TILE_ROCK;
}

function stopBlinkingPlayer() {
  if (blinking === true) {
    blinking = false;
  }
}

function changeStateGame() {
  if (levelState === LV_2) {
    gameState = GS_WIN;
    levelEnd = false;
    levelState = LV_1;
  }
  if (levelState === LV_1 && levelEnd === true) {
    levelEnd = false;
    levelState = LV_2;
    player.resetPosition();
    boardGame = [];
    fillArray2();
    restartEnemiesLv2();
  }
}

function restartEnemiesLv2() {
  allEnemies.forEach(function(enemy) {
    enemy.randomizeSpeed();
    enemy.bugArray = [3, 4, 5, 6, 7, 8];
    enemy.randomizeRow();
    return;
  });
}

/*
   ENEMY
         */

var Enemy = function(sprite, row, speed) {
  this.ENEMY_STARTING_POSITION = -200;
  this.x = this.ENEMY_STARTING_POSITION;
  this.speed = speed;
  this.sprite = sprite;
  this.row = row;
};

Enemy.prototype.getCanvasY = function() {
  return this.row * 83 - 12;
};

Enemy.prototype.speedArray = [650, 350, 200, 1000];

Enemy.prototype.bugArray = [2, 3, 4, 6, 7];

Enemy.prototype.randomizeSpeed = function() {
  this.x = this.ENEMY_STARTING_POSITION;
  let randomEnemySpeedIndex = Math.floor(Math.random() * this.speedArray.length);
  this.speed = this.speedArray[randomEnemySpeedIndex];
};

Enemy.prototype.randomizeRow = function() {
  let randomBugIndex = Math.floor(Math.random() * this.bugArray.length);
  this.row = this.bugArray[randomBugIndex];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.x < ctx.canvas.width) {
    this.x += (this.speed * dt);
  } else {
    this.randomizeSpeed();
    this.randomizeRow();
  }
  this.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.getCanvasY());
};

// Check when is collision and react properly
Enemy.prototype.checkCollisions = function() {
  let rightSideCollision = this.x <= player.getCanvasX() && this.x + 60 >= player.getCanvasX();
  let leftSideCollision = this.x >= player.getCanvasX() && player.getCanvasX() + 60 >= this.x;
  let theSamePlayerEnemyRow = this.row === player.row;

  if (blinking === false && ((rightSideCollision || leftSideCollision) && theSamePlayerEnemyRow)) {
    heart.countHearts -= 1;

    if (heart.countHearts === 0) {
      player.resetPosition();
      heart.countHearts = 3;
      if (levelState === LV_1) {
        fillArray();
      } else if (levelState === LV_2) {
        fillArray2();
      }

    } else {
      blinking = true;
      setTimeout(stopBlinkingPlayer, 1200);
    }
  }
};

let allEnemies = [
  new Enemy('images/char-cat-girl.png'),
  new Enemy('images/char-horn-girl.png'),
  new Enemy('images/char-pink-girl.png'),
  new Enemy('images/char-princess-girl.png'),
  new Enemy('images/char-horn-girl.png'),
  new Enemy('images/char-cat-girl.png'),
  new Enemy('images/char-princess-girl.png'),
];

/*
   PLAYER
           */

var Player = function(col, row) {
  this.startingRow = row;
  this.startingCol = col;
  this.col = col;
  this.row = row;
  this.sprite = 'images/char-boy.png';
  this.PS_HOLD_BUG = 'hold bug';
  this.PS_NO_HOLD_BUG = 'no hold bug';
  this.playerState = this.PS_NO_HOLD_BUG;
};

Player.prototype.getCanvasY = function() {
  return this.row * 83 - 15;
};

Player.prototype.getCanvasX = function() {
  return this.col * 101;
};

Player.prototype.resetPosition = function() {
  this.col = this.startingCol;
  this.row = this.startingRow;
  this.playerState = this.PS_NO_HOLD_BUG;
};

Player.prototype.update = function(dt) {
  this.reachZoneAchiev();
};

Player.prototype.drawPlayer = function() {
  ctx.drawImage(Resources.get(this.sprite), this.getCanvasX(), this.getCanvasY());
  if (this.playerState === this.PS_HOLD_BUG) {
    ctx.drawImage(Resources.get('images/enemy-bug.png'), this.getCanvasX() + 14, this.getCanvasY() - 30, 101 * 0.75, 171 * 0.75);
  }
};

// function from https://gamedev.stackexchange.com/questions/70116/how-do-i-make-a-sprite-blink-on-an-html5-canvas
Player.prototype.render = function() {
  if (blinking === true) {
    if (Math.floor(Date.now() / FREQUENCY) % 2) {
      this.drawPlayer();
    }
  } else {
    this.drawPlayer();
  }
};

Player.prototype.handleInput = function(direction) {
  const OLD_THIS_ROW = this.row;
  const OLD_THIS_COL = this.col;
  const MOVE_CONDITIONS = boardGame[this.row][this.col].otherTileOn !== TILE_SELECTOR || this.playerState !== this.PS_HOLD_BUG;

  switch (direction) {
    case 'right':
      if (this.col <= 7 && MOVE_CONDITIONS) {
        this.col += 1;
      }
      break;

    case 'left':
      if (this.col >= 1 && MOVE_CONDITIONS) {
        this.col -= 1;
      }
      break;
    case 'up':
      if (this.row >= 1 && MOVE_CONDITIONS) {
        this.row -= 1;
      }
      break;
    case 'down':
      if (this.row <= 8 && MOVE_CONDITIONS) {
        this.row += 1;
      }
      break;
  }

  if (boardGame[this.row][this.col].otherTileOn === TILE_ROCK ||
    boardGame[this.row][this.col].tileType === TILE_WATER) {
    this.row = OLD_THIS_ROW;
    this.col = OLD_THIS_COL;
  }
  if (boardGame[this.row][this.col].otherTileOn === TILE_BUG) {
    this.playerState = this.PS_HOLD_BUG;
    boardGame[this.row][this.col].otherTileOn = undefined;
  }
};

// determines when Player win level
Player.prototype.reachZoneAchiev = function() {
  if (levelEnd === false && (this.playerState === this.PS_HOLD_BUG && boardGame[this.row][this.col].otherTileOn === TILE_SELECTOR)) {
    allEnemies.forEach(function(enemy) {
      enemy.speed = 0;
    });
    levelEnd = true;
    setTimeout(changeStateGame, 500);
  }
};

let player = new Player(4, 9);

/*
   HEART
         */

var Heart = function(countHearts, x, y, distance = 40) {
  this.x = x;
  this.y = y;
  this.distance = distance;
  this.countHearts = countHearts;
  this.sprite = 'images/Heart.png';
};

Heart.prototype.drawHeart = function(x) {
  ctx.drawImage(Resources.get(this.sprite), x, this.y, 101 * 0.4, 171 * 0.4);

};

Heart.prototype.render = function() {
  for (let i = 0; i < this.countHearts; i++) {
    this.drawHeart(this.x + i * this.distance);
  }
};

let heart = new Heart(3, 90, 70);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {

  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    13: 'enter'
  };

  player.handleInput(allowedKeys[e.keyCode]);
  if (gameState === GS_TITLE) {
    if (allowedKeys[e.keyCode] === 'right') {
      menu = 0;
    }
    if (allowedKeys[e.keyCode] === 'left') {
      menu = 1;
    }
  }
  if (allowedKeys[e.keyCode] === 'enter') {
    if (gameState === GS_TITLE && menu === 1) {
      gameState = GS_START;
    } else if (gameState === GS_TITLE && menu !== 1) {
      gameState = GS_INSTRUCTIONS;
    } else if (gameState === GS_INSTRUCTIONS) {
      gameState = GS_TITLE;
    }
    if (gameState === GS_WIN) {
      gameState = GS_TITLE;
      levelState = LV_1;
      boardGame = [];
      fillArray();
      player.resetPosition();
      heart.countHearts = 3;
      allEnemies.forEach(function(enemy) {
        enemy.randomizeSpeed();
        enemy.bugArray = [2, 3, 4, 6, 7];
        enemy.randomizeRow();
        return;
      });
    }
  }
});
