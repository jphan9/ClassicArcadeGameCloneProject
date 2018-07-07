// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + (this.speed * dt);
    //console.log("enemy speed: " + this.x);

    if(this.x >= 550) {
      this.x = 0;
    }

    let width = Math.abs(player.x - this.x);
    let height = Math.abs(player.y - this.y);
    if (width <= 50 && height <= 50) {
      player.displayNumberOfTries();
      //console.log(player.displayNumberOfTries());
      player.resetPlayer();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y,speed) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.counter = 0;
};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handles the player input. Also checks the win condition as well as the boundaries of the canvas.
Player.prototype.handleInput = function(key) {
    let tries = document.querySelector('.tries');

    // Displays the popup win modal, resets the player and counter when win condition is met.
    if((this.y >= 0 && this.y <= 25) && (this.x >= 0 ||this.x <= 370))
    {
      this.displayWinPopup();
      this.resetPlayer();
      this.counter = 0;
      tries.textContent = "Number of Tries: " + this.counter;
    }
    else if(key == 'left' && this.x >= 0)
    {
      this.x = this.x - (this.speed);
    }
    else if(key == 'up' && this.y >= 0)
    {
      this.y = this.y - (this.speed);
    }
    else if(key == 'right' && this.x <= 380)
    {
      this.x = this.x + (this.speed);
    }
    else if(key == 'down' && this.y <= 400)
    {
      this.y = this.y + (this.speed);
    }
};

// Function that displays a win popup modal.
Player.prototype.displayWinPopup = function() {
    let popup = document.querySelector('.win-popup-modal');
    let close = document.querySelector('.close');

    popup.style.display = "inline";

    close.addEventListener('click',function() {
      popup.style.display = "none";
    });
};

// Displays the number of tries that the player has attempted.
Player.prototype.displayNumberOfTries = function() {
  let tries = document.querySelector('.tries');
  this.counter++;
  console.log(this.counter);
  tries.textContent = "Number of Tries: " + this.counter;
};


// Resets the player position.
Player.prototype.resetPlayer = function() {
  this.x = 210;
  this.y = 450;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];

let enemy1 = new Enemy(0,50,50);
let enemy2 = new Enemy(200,50,50);
let enemy3 = new Enemy(0,130,100);
let enemy4 = new Enemy(0,210,150);
let enemy5 = new Enemy(210,210,150);

let enemyArray = [enemy1,enemy2,enemy3,enemy4,enemy5];

for(let i = 0; i < 5; i++)
{
  allEnemies.push(enemyArray[i]);
}

let player = new Player(210, 450, 40);

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
