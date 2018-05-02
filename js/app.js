// Enemies our player must avoi
// let winGame = false;
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

// objectTile = new Indextile();

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
  // boardGame[0][4].otherTileOn = heart;
  // boardGame[2][4].otherTileOn = heart;
}
fillArray();
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
Enemy.prototype.getCanvasY = function() {
    return this.row *83 - 12;
}
Enemy.prototype.bugArray = [ 2, 3, 4, 6, 7 ];

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
    // player.resetPosition();
    collision = true;
    setTimeout(blinkingPlayer, 300);
    heart.countHarts -= 1;
    this.x = player.getCanvasX() + 101;
    if(heart.countHarts === 0) {
      player.resetPosition();
    }
  }
  // if (collision === true) {
  //
  // }
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

var frequency = 100;
let collision = false;
let playerState = 'no hold bug';
Player.prototype.render = function() {
  if(collision === true) {
  // https://gamedev.stackexchange.com/questions/70116/how-do-i-make-a-sprite-blink-on-an-html5-canvas

    if (Math.floor(Date.now() / frequency) % 2) {
      ctx.drawImage(Resources.get(this.sprite), this.getCanvasX(), this.getCanvasY());
      if(playerState === 'hold bug') {
          // ctx.drawImage(Resources.get(this.sprite), this.getCanvasX(), this.getCanvasY());
          ctx.drawImage(Resources.get('images/enemy-bug.png'), this.getCanvasX() + 14, this.getCanvasY() - 30, 101*0.75, 171*0.75);
      // }if (! blinking || Math.floor(Date.now() / frequency) % 2) {
      //         ctx.drawImage(Resources.get(this.sprite), this.getCanvasX(), this.getCanvasY());
      //         ctx.drawImage(Resources.get('images/enemy-bug.png'), this.getCanvasX() + 14, this.getCanvasY() - 30, 101*0.75, 171*0.75);
      //
      }
    }


  } else {
    ctx.drawImage(Resources.get(this.sprite), this.getCanvasX(), this.getCanvasY());
    if(playerState === 'hold bug') {
        // ctx.drawImage(Resources.get(this.sprite), this.getCanvasX(), this.getCanvasY());
        ctx.drawImage(Resources.get('images/enemy-bug.png'), this.getCanvasX() + 14, this.getCanvasY() - 30, 101*0.75, 171*0.75);
    // }if (! blinking || Math.floor(Date.now() / frequency) % 2) {
    //         ctx.drawImage(Resources.get(this.sprite), this.getCanvasX(), this.getCanvasY());
    //         ctx.drawImage(Resources.get('images/enemy-bug.png'), this.getCanvasX() + 14, this.getCanvasY() - 30, 101*0.75, 171*0.75);
    //
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
  gameState = 'game win';
  player.resetPosition();
};

Player.prototype.reachZoneAchiev = function() {
  if ( playerState === 'hold bug' && boardGame[this.row][this.col].otherTileOn === selector ) {
    allEnemies.forEach(function(enemy) {
      enemy.speed = 0;
    });

    setTimeout(changeStateGame, 500);
    // console.log(winGame);
  };
};

var Heart = function(countHarts, x, y) {
  this.x = x;
  this.y = y;
  this.countHarts = countHarts;
  this.sprite = 'images/Heart.png';
}



Heart.prototype.render = function() {
  if (this.countHarts >=1) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 101*0.4, 171*0.4);
  }
  if(this.countHarts >=2) {
    ctx.drawImage(Resources.get(this.sprite), this.x + 45, this.y, 101*0.4, 171*0.4);
  }
  if(this.countHarts >=3) {
    ctx.drawImage(Resources.get(this.sprite), this.x + 90, this.y, 101*0.4, 171*0.4);
  }
};

Heart.prototype.update = function(dt) {

};

// Heart.prototype.getCanvasY = function() {
//   return this.row *83;
// };
//
// Heart.prototype.getCanvasX = function() {
//   return this.col *101;
// };

const heart = new Heart(3,0,70);
// const heart2 = new Heart(45,70);


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
      gameState = 'start game';
    }
  }

    if (gameState === 'game win') {
      if (allowedKeys[e.keyCode] === 'enter') {
        gameState = 'start game';
        playerState = 'no hold bug';
        boardGame[2][2].otherTileOn = bug
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
