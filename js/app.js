'use strict';

/**
* @description Represents an enemy
* @param x - The x position of the enemy
* @param y - The y position of the enemy
*/
// Enemies our player must avoid
var Enemy = function(x, y) {
	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';

	// Set the enemy position
	this.x = x;
	this.y = y;

	// Set speed
	this.speed = Math.floor((Math.random() * 2) + 1);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	if (this.x < 400) {
		this.x = this.x + (100 * dt * this.speed);
	}
	else {
		this.x = 20;
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @description Represents a player
*/
var Player = function() {
	this.x = 200;
	this.y = 400;
	this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
	if (this.x < 0) {
		this.x = 0;
	} else if (this.y > 400) {
		this.y = 400;
	} else if (this.x > 400) {
		this.x = 400;
	} else if (this.y < 0){
		this.y = 400;
	}
};

Player.prototype.resetPlayerPositions = function() {
	this.x = 200;
	this.y = 400;
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {

	if  (key === 'up' && this.y > 15)
	{
		this.y = this.y - 90;
	} else if (key === 'left' && this.x > 0)
	{
		this.x = this.x - 100;
	} else if (key === 'right' && this.x < 500)
	{
		this.x = this.x + 100;
	} else if (key === 'down' && this.y < 600)
	{
		this.y = this.y + 70;
	} else if (this.y === 50) {
		player.resetPlayerPositions();
	}
};

// Now instantiate your objects.
var enemyA = new Enemy(100, 145);
var enemyB = new Enemy(200, 230);
var enemyC = new Enemy(550, 55);
var enemyD = new Enemy(350, 55);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemyA, enemyB, enemyC, enemyD];

// Place the player object in a variable called player
var player = new Player();

function checkCollisions() {
	// for each bug check their position and player position 
	allEnemies.forEach(function(bug){
			var Xdiff = bug.x - player.x;
			var Ydiff = bug.y - player.y;
			var distance = Math.sqrt(Xdiff * Xdiff + Ydiff * Ydiff);

			// if collision then reset player's position
			if (distance < 30){
				player.x = 200;
				player.y = 400;
			}
		});
}


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
