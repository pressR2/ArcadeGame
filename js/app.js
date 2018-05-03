// Enemies our player must avoi
// let winGame = false;
// let gameState = 'gameTitle';
// let gameState = 'instructions';
// let gameState = 'game win';
let gameState = 'game introduce';
const stone = 'tileStone';
const water = 'tileWater';
const grass = 'tileGrass';
const rock = 'tileRock';
const selector = 'tileSelector';
const bug = 'tileBug';
const white = 'tileWhite';
// const heart = 'tileHeart';

let boardGame = [];
 var Indextile = function(tileType, otherTileOn){
   this.otherTileOn = otherTileOn;
   this.tileType = tileType;
 }

function fillArray() {
  rowAmount = 10;
  colAmount = 9
  for(let row = 0; row < rowAmount; row ++) {
    let rowTable = [];
    for(let col = 0; col < colAmount; col++) {
      if([0].includes(row)) {
        rowTable.push(new Indextile(white))
      }
      if([1, 5].includes(row)) {
        rowTable.push(new Indextile(water));
    }
      if([2, 3, 4, 6, 7].includes(row)) {
        rowTable.push(new Indextile(stone));
      }
      if([8, 9].includes(row)) {
        rowTable.push(new Indextile(grass));
      }
    }
    boardGame.push(rowTable);
  }
  boardGame[5][3] = new Indextile(stone);
  boardGame[7][3].otherTileOn = rock;
  boardGame[3][3].otherTileOn = rock;
  boardGame[4][5].otherTileOn = rock;
  boardGame[2][7].otherTileOn = selector;
  boardGame[2][2].otherTileOn = bug;
  boardGame[2][4].otherTileOn = rock;
}
fillArray();

function fillArray2() {
  rowAmount = 10;
  colAmount = 9
  for(let row = 0; row < rowAmount; row ++) {
    let rowTable2 = [];
    for(let col = 0; col < colAmount; col++) {
      if([0].includes(row)) {
        rowTable2.push(new Indextile(white))
      }
      if([1, 2].includes(row)) {
        rowTable2.push(new Indextile(water));
    }
      if([4, 5, 6, 7, 8].includes(row)) {
        rowTable2.push(new Indextile(grass));
      }
      if([3, 9].includes(row)) {
        rowTable2.push(new Indextile(stone));
      }
    }
    boardGame.push(rowTable2);
  }
  boardGame[2][1] = new Indextile(stone);
  boardGame[2][5] = new Indextile(stone);
  // boardGame[2][7] = new Indextile(stone);
  boardGame[8][5].otherTileOn = rock;
  boardGame[8][6].otherTileOn = rock;
  boardGame[8][8].otherTileOn = rock;
  boardGame[6][8].otherTileOn = rock;
  boardGame[6][6].otherTileOn = rock;
  boardGame[6][7].otherTileOn = rock;
  boardGame[5][8].otherTileOn = rock;
  boardGame[7][8].otherTileOn = rock;
  boardGame[4][8].otherTileOn = rock;

  boardGame[4][5].otherTileOn = rock;
  boardGame[4][6].otherTileOn = rock;
  boardGame[4][8].otherTileOn = rock;
  boardGame[6][3].otherTileOn = selector;
  boardGame[2][1].otherTileOn = bug;
  boardGame[3][8].otherTileOn = rock;

  boardGame[4][4].otherTileOn = rock;
  boardGame[5][4].otherTileOn = rock;
  boardGame[6][4].otherTileOn = rock;
  boardGame[7][4].otherTileOn = rock;
  boardGame[8][4].otherTileOn = rock;

  boardGame[8][0].otherTileOn = rock;
  boardGame[8][1].otherTileOn = rock;
  boardGame[8][2].otherTileOn = rock;

  boardGame[4][0].otherTileOn = rock;
  boardGame[5][0].otherTileOn = rock;
  boardGame[6][0].otherTileOn = rock;
  boardGame[7][0].otherTileOn = rock;
  boardGame[8][0].otherTileOn = rock;
  boardGame[4][3].otherTileOn = rock;
  boardGame[4][1].otherTileOn = rock;
  boardGame[5][3].otherTileOn = rock;
  boardGame[6][2].otherTileOn = rock;
  boardGame[3][0].otherTileOn = rock;
  boardGame[8][3].otherTileOn = rock;

  // boardGame[0][4].otherTileOn = heart;
  // boardGame[2][4].otherTileOn = heart;
};

var Enemy = function(sprite,row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = this.ENEMY_STARTING_POSITION;
    this.speed = speed;
    this.sprite = sprite;
    this.row = row;
    // this.collision = false;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.speddArray = [ 240, 380, 140, 500 ];
// Enemy.prototype.speddArray = [ 140, 140, 140, 140 ];
Enemy.prototype.getCanvasY = function() {
    return this.row *83 - 12;
}

Enemy.prototype.bugArray = [ 2, 3, 4, 6, 7 ];


Enemy.prototype.ENEMY_STARTING_POSITION = -200;

Enemy.prototype.newSpeddLv2 = function() {
  this.x = this.ENEMY_STARTING_POSITION;
    var speddArrayLength = this.speddArray.length;
    let randomIndex = Math.floor(Math.random() * speddArrayLength);
  this.speed = this.speddArray[randomIndex];
};

Enemy.prototype.newYpositionLv2 = function() {
  var startIndexBugArray = this.bugArray.length, randomBugIndex;
   randomBugIndex = Math.floor(Math.random() * startIndexBugArray);
  this.row = this.bugArray[randomBugIndex];
};

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < ctx.canvas.width) {
      this.x += (this.speed * dt);
    } else {
      this.newSpeddLv2();

      this.newYpositionLv2();
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

   if (collision === false &&((this.x <= player.getCanvasX() && this.x + 60 >= player.getCanvasX() ||
       this.x >= player.getCanvasX() && player.getCanvasX() + 60 >= this.x)
       && this.row === player.row)) {
     // this.speed = 0;
    // var collision = true;
    //  console.log(this.collision);
    // player.resetPosition();
    collision = true;
    setTimeout(blinkingPlayer, 1200);
    heart.countHearts -= 1;
    if(heart.countHearts === 0) {
      player.resetPosition();
      heart.restartPosition();
      playerState = 'no hold bug';
      bugPositionInNewMap();
    }
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

};

Player.prototype.update = function(dt) {
  this.reachZoneAchiev();
};

var frequency = 100;
let collision = false;
let playerState = 'no hold bug';
let levelState = 'level 1';
Player.prototype.render = function() {
  if(collision === true) {
  // https://gamedev.stackexchange.com/questions/70116/how-do-i-make-a-sprite-blink-on-an-html5-canvas

    if (Math.floor(Date.now() / frequency) % 2) {
      ctx.drawImage(Resources.get(this.sprite), this.getCanvasX(), this.getCanvasY());
      if(playerState === 'hold bug') {

          ctx.drawImage(Resources.get('images/enemy-bug.png'), this.getCanvasX() + 14, this.getCanvasY() - 30, 101*0.75, 171*0.75);

      }
    }


  } else {
    ctx.drawImage(Resources.get(this.sprite), this.getCanvasX(), this.getCanvasY());
    if(playerState === 'hold bug') {

        ctx.drawImage(Resources.get('images/enemy-bug.png'), this.getCanvasX() + 14, this.getCanvasY() - 30, 101*0.75, 171*0.75);

    }
  }

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
    if (this.col <= 7 && (boardGame[this.row][this.col].otherTileOn !== selector || playerState !== 'hold bug')) {
      this.col += 1;

      if (boardGame[this.row][this.col].otherTileOn === rock ||
        boardGame[this.row][this.col].tileType === water) {
        this.col -= 1;
      }
        if(boardGame[this.row][this.col].otherTileOn === bug) {
          playerState = 'hold bug';
          boardGame[this.row][this.col].otherTileOn = undefined;
        }
      }

    break;
    case 'left':
      if (this.col >= 1 && (boardGame[this.row][this.col].otherTileOn !== selector || playerState !== 'hold bug')) {
        this.col -= 1;
        if (boardGame[this.row][this.col].otherTileOn === rock ||
          boardGame[this.row][this.col].tileType === water) {
          this.col +=1;
        }
        if(boardGame[this.row][this.col].otherTileOn === bug) {
          playerState = 'hold bug';
          boardGame[this.row][this.col].otherTileOn = undefined;
        }
    }
    break;
    case 'up':
      if (this.row >= 1 && (boardGame[this.row][this.col].otherTileOn !== selector || playerState !== 'hold bug')) {
      this.row -= 1;
      if (boardGame[this.row][this.col].otherTileOn === rock ||
        boardGame[this.row][this.col].tileType === water) {
        this.row +=1;
      }
      if(boardGame[this.row][this.col].otherTileOn === bug) {
        playerState = 'hold bug';
        boardGame[this.row][this.col].otherTileOn = undefined;
      }
    }
    break;
    case 'down':
      if (this.row <= 8 && (boardGame[this.row][this.col].otherTileOn !== selector || playerState !== 'hold bug')) {
        this.row += 1;
        if (boardGame[this.row][this.col].otherTileOn === rock ||
          boardGame[this.row][this.col].tileType === water) {
          this.row -=1;
        }
        if(boardGame[this.row][this.col].otherTileOn === bug) {
          playerState = 'hold bug';
          boardGame[this.row][this.col].otherTileOn = undefined;
        }
      }
      break;
}

// console.log(this.row);
// console.log(this.col);
};
function blinkingPlayer(){
  if(collision === true) {
    collision = false;
  }
};



function changeStateGame() {
  if (levelState === 'level 2') {
    gameState = 'game win';
    levelEnd = false;
    levelState = 'level 1';
  }
  // gameState = 'ga win';
  if(levelState === 'level 1' && levelEnd === true){
    levelEnd = false;
  levelState = 'level 2';
  player.resetPosition();
  playerState = 'no hold bug';
  boardGame = [];
  fillArray2();
  restartEnemiesLv2();
  ChangeReachZoneXY();
  bugPositionInNewMap();
}
};

function ChangeReachZoneXY() {
  if(levelState === 'level 1') {
      return boardGame[2][7].otherTileOn = selector;
    } else {
      return boardGame[6][3].otherTileOn = selector;
    }
  };

  function restartEnemiesLv2() {
    allEnemies.forEach(function(enemy) {
    enemy.newSpeddLv2();
    enemy.bugArray = [ 3, 4, 5, 6, 7, 8 ];
    enemy.newYpositionLv2();
    return;
  });
  };

  function bugPositionInNewMap() {
    if(levelState === 'level 1') {
      return boardGame[2][2].otherTileOn = bug;
    } else {
      return boardGame[2][1].otherTileOn = bug;
    }
  };
var levelEnd = false;
Player.prototype.reachZoneAchiev = function() {
  if (levelEnd === false && (playerState === 'hold bug' && boardGame[this.row][this.col].otherTileOn === selector)) {
    allEnemies.forEach(function(enemy) {
      enemy.speed = 0;
    });
    levelEnd = true;
    setTimeout(changeStateGame, 500);
    // console.log(winGame);
  };
};

var Heart = function(countHearts, x, y) {
  this.startingPositionX = x;
  // this.startingPositiony = y;
  this.startingCountHearts = countHearts;
  this.x = x;
  this.y = y;
  this.countHearts = countHearts;
  this.sprite = 'images/Heart.png';
}

Heart.prototype.restartPosition = function() {
   this.x = this.startingPositionX;
   // this.y = this.startingPositionY;
   this.countHearts = this.startingCountHearts;
   // console.log(this.startingCol);
};

Heart.prototype.drawHeart = function() {
  if (this.countHearts >=1) {
    ctx.drawImage(Resources.get(this.sprite), this.x + 90, this.y, 101*0.4, 171*0.4);
  }
  if(this.countHearts >=2) {
    ctx.drawImage(Resources.get(this.sprite), this.x + 135, this.y, 101*0.4, 171*0.4);
  }
  if(this.countHearts >=3) {
    ctx.drawImage(Resources.get(this.sprite), this.x + 180, this.y, 101*0.4, 171*0.4);
  }
};


Heart.prototype.render = function() {
  this.drawHeart();
};


Heart.prototype.update = function(dt) {

};

let heart = new Heart(3,0,70);


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [
                  new Enemy('images/char-cat-girl.png'),
                  new Enemy('images/char-horn-girl.png'),
                  new Enemy('images/char-pink-girl.png'),
                  new Enemy('images/char-princess-girl.png')
                ];

let player = new Player(4, 9);


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
      // gameState = 'start game';
      gameState = 'gameTitle';
    }
  } else if(gameState === 'gameTitle') {
    if(allowedKeys[e.keyCode] === 'enter') {
    gameState = 'instructions';
  }
} else if (gameState === 'instructions') {
  if(allowedKeys[e.keyCode] === 'enter') {
  gameState = 'start game';
}
}
// if (levelState === 'level 2') {
//   gameState = 'start game';
// }


    if (gameState === 'game win') {
      if (allowedKeys[e.keyCode] === 'enter') {
        levelState = 'level 1';
        boardGame = [];
        fillArray();
        gameState = 'start game';
        player.resetPosition();
        playerState = 'no hold bug';
        bugPositionInNewMap();
        heart.restartPosition();
        allEnemies.forEach(function(enemy) {
          enemy.newSpeddLv2();
          enemy.bugArray = [ 2, 3, 4, 6, 7 ];
          enemy.newYpositionLv2();
          return;
      });

    }
    }
});
