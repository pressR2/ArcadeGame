// Enemies our player must avoi
// let winGame = false;
let gameState = 'game introduce';
const stone = 'tileStone';
const water = 'tilewater';
const grass = 'tileGrass';
const rock = 'tileRock';
const selector = 'tileSelector';

let boardGame = [];

 var Indextile = function(tileType, otherTileOn){
   this.otherTileOn = otherTileOn;
   this.tileType = tileType;
 }

// objectTile = new Indextile();

function fillArray() {
  rowAmount = 9;
  colAmount = 9
  for(let row = 0; row < rowAmount; row ++) {
    let rowTable = [];
    for(let col = 0; col < colAmount; col++) {
      if([0, 4].includes(row)) {
        rowTable.push(new Indextile(water));
    }
      if([1, 2, 3, 5, 6].includes(row)) {
        rowTable.push(new Indextile(stone));
      }
      if([7,8].includes(row)) {
        rowTable.push(new Indextile(grass));
      }
    }
    boardGame.push(rowTable);
  }
  boardGame[4][3] = new Indextile(stone);
  boardGame[6][3].otherTileOn = rock;
  boardGame[2][3].otherTileOn = rock;
  boardGame[3][5].otherTileOn = rock;
  boardGame[1][7].otherTileOn = selector;
}
fillArray();
var Enemy = function(row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = this.ENEMY_STARTING_POSITION;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.row = row;
    // this.collision = false;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.speddArray = [ 240, 380, 140, 500 ];
Enemy.prototype.getCanvasY = function() {
    return this.row *83 - 20;
}
Enemy.prototype.bugArray = [ 1, 2, 3, 5, 6 ];

Enemy.prototype.ENEMY_STARTING_POSITION = -200;

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < ctx.canvas.width) {
      this.x += (this.speed * dt);
    } else {
      this.x = this.ENEMY_STARTING_POSITION;
        var currentIndex = this.speddArray.length;
        let randomIndex = Math.floor(Math.random() * currentIndex);
      this.speed = this.speddArray[randomIndex];

      var startIndexBugArray = this.bugArray.length, randomBugIndex;
       randomBugIndex = Math.floor(Math.random() * startIndexBugArray);
      this.row = this.bugArray[randomBugIndex];
    }
    this.checkCollisions();
    // console.log(this.y);
  };
    // console.log(this.y);

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.getCanvasY());
};

Enemy.prototype.checkCollisions = function() {
   if ((this.x <= player.getCanvasX() && this.x + 60 >= player.getCanvasX() ||
       this.x >= player.getCanvasX() && player.getCanvasX() + 60 >= this.x)
       && this.row === player.row) {
     // this.speed = 0;
    // var collision = true;
    //  console.log(this.collision);
    player.resetPosition();
  }
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(col, row) {
  this.startingRow = row
  this.startingCol = col;
  this.col = col;
  this.row = row;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.resetPosition = function() {
   this.col = this.startingCol;
   this.row = this.startingRow;
   // console.log(this.startingCol);
};

Player.prototype.update = function(dt) {
  this.reachZoneAchiev();
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.getCanvasX(), this.getCanvasY());
};

Player.prototype.getCanvasY = function() {
  return this.row *83 -15;
};

Player.prototype.getCanvasX = function() {
  return this.col *101;
};

Player.prototype.handleInput = function(direction) {
switch (direction) {
  case 'right':
    if (this.col <= 7) {
      this.col += 1;
      if (boardGame[this.row][this.col].otherTileOn === rock ||
        boardGame[this.row][this.col].tileType === water) {
        this.col -= 1;
      }
    }
    break;
    case 'left':
      if (this.col >= 1) {
        this.col -= 1;
        if (boardGame[this.row][this.col].otherTileOn === rock ||
          boardGame[this.row][this.col].tileType === water) {
          this.col +=1;
        }
    }
    break;
    case 'up':
      if (this.row >= 1) {
      this.row -= 1;
      if (boardGame[this.row][this.col].otherTileOn === rock ||
        boardGame[this.row][this.col].tileType === water) {
        this.row +=1;
      }
    }
    break;
    case 'down':
      if (this.row <= 7) {
        this.row += 1;
        if (boardGame[this.row][this.col].otherTileOn === rock ||
          boardGame[this.row][this.col].tileType === water) {
          this.row -=1;
        }
      }
      break;
}

// console.log(this.row);
// console.log(this.col);
};

function changeStateGame() {
  gameState = 'game win';
  player.resetPosition();
};

Player.prototype.reachZoneAchiev = function() {
  if (boardGame[this.row][this.col].otherTileOn === selector ) {

    allEnemies.forEach(function(enemy) {
      enemy.speed = 0;
    });

    setTimeout(changeStateGame, 500);
    // console.log(winGame);
  };
};

// var ReachZone = function(x, y) {
//   this.x = x;
//   this.y = y;
//   this.sprite = 'images/Selector.png';
// };

// var StoneBridge = function(x, y) {
//   this.x = x;
//   this.y = y;
//   this.sprite = 'images/stone-block.png';
// };
//
// StoneBridge.prototype.render = function() {
//   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };
//
//
// ReachZone.prototype.update = function(dt) {
//
// };
//
// ReachZone.prototype.render = function() {
//   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
//
// };


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [
                  new Enemy(),
                  new Enemy(),
                  new Enemy(),
                  new Enemy()];

let player = new Player(4, 8);


// let reachZone = new ReachZone(302, 43);
//
// const stoneBridge1 = new StoneBridge(200,320);
// const StoneBridge2 = new StoneBridge(500,300);


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

    if (gameState === 'game introduce') {
      if(allowedKeys[e.keyCode] === 'enter') {
      gameState = 'start game';
    }
    }

    if (gameState === 'game win') {
      if (allowedKeys[e.keyCode] === 'enter') {
        gameState = 'start game';
      // winGame = false;
        allEnemies.forEach(function(enemy) {
        enemy.x = enemy.ENEMY_STARTING_POSITION;
        return;
      });
      allEnemies.forEach(function(enemy) {
        enemy.update();
      });
    }
    }
});
