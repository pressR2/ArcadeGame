// Enemies our player must avoi
var Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = this.ENEMY_STARTING_POSITION;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.collision = false;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.speddArray = [ 220, 320, 140, 450 ];
Enemy.prototype.bugArray = [ 144, 60, 226 ];

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
      this.y = this.bugArray[randomBugIndex];
    }
    this.checkCollisions();
    // console.log(this.y);
  };
    // console.log(this.y);

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function() {
   if (this.x - 40 <= player.x && this.x + 60 >= player.x && this.y === player.y) {
     this.speed = 0;
     this.collision = true;
     console.log(this.collision);
     player.x = 200;
     player.y = 320;
   }
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.handleInput = function(direction) {
switch (direction) {
  case 'right':
    if (this.x <= 300) {
      this.x += 100;
    }
    break;
    case 'left':
      if (this.x >= 100) {
      this.x -= 100;
    }
    break;
    case 'up':
      if (this.y >= 100) {
      this.y -= 82;
    }
    break;
    case 'down':
      if (this.y <= 380) {
        this.y += 82;
      }
      break;
}

console.log(this.y);
};

var ReachZone = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/Selector.png';
};

ReachZone.prototype.update = function(dt) {

};

ReachZone.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [
                  new Enemy( 144, 220),
                  new Enemy( 60, 320),
                  new Enemy( 144, 140),
                  new Enemy( 226, 450)];

let player = new Player(200, 390);


let reachZone = new ReachZone(302, 40);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
