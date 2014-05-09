// This example uses the Phaser 2.0.4 framework

// Copyright © 2014 John Watson
// Licensed under the terms of the MIT License

var GameState = function(game) {
};

// Load images and sounds
GameState.prototype.preload = function() {
	this.game.load.image('bullet', '/assets/gfx/bullet.png');
	this.game.load.image('ground', '/assets/gfx/ground.png');
	this.game.load.spritesheet('explosion', '/assets/gfx/explosion.png', 128, 128);
	this.game.load.image('monster', '/assets/gfx/moster.png');
};

// Setup the example
GameState.prototype.create = function() {
	// Set stage background color
	this.game.stage.backgroundColor = 0x4488cc;

	// Define constants
	this.SHOT_DELAY = 200; // milliseconds (10 bullets/second)
	this.BULLET_SPEED = 500; // pixels/second
	this.NUMBER_OF_BULLETS = 20;
	this.GUN_MOVE_SPEED = 400;
	this.ENEMY_DELAY = 500; // milliseconds (10 bullets/second)
	this.ENEMY_SPEED = 500; // pixels/second
	this.NUMBER_OF_ENEMIES = 20;

	// Create an object representing our gun
	this.gun = this.game.add.sprite(this.game.width / 2, this.game.height - 32, 'bullet');

	// Enable physics on the player
	this.game.physics.enable(this.gun, Phaser.Physics.ARCADE);

	// Set the pivot point to the center of the gun
	this.gun.anchor.setTo(0.5, 0.5);

	// Capture certain keys to prevent their default actions in the browser.
	// This is only necessary because this is an HTML5 game. Games on other
	// platforms may not need code like this.
	this.game.input.keyboard.addKeyCapture([
		Phaser.Keyboard.LEFT,
		Phaser.Keyboard.RIGHT,
		Phaser.Keyboard.UP,
		Phaser.Keyboard.DOWN
	]);

	// Create an object pool of bullets
	this.bulletPool = this.game.add.group();
	for(var i = 0; i < this.NUMBER_OF_BULLETS; i++) {
		// Create each bullet and add it to the group.
		var bullet = this.game.add.sprite(0, 0, 'bullet');
		this.bulletPool.add(bullet);

		// Set its pivot point to the center of the bullet
		bullet.anchor.setTo(0.5, 0.5);

		// Enable physics on the bullet
		this.game.physics.enable(bullet, Phaser.Physics.ARCADE);

		// Set its initial state to "dead".
		bullet.kill();
	}

	//Create walls to restrict move range
	this.walls = this.game.add.group();
	// Add the ground blocks, enable physics on each, make them immovable
	var wallBlock = this.game.add.sprite(-18, this.game.height - 32, 'ground');
	wallBlock.anchor.setTo(0.5, 0.5);
	this.game.physics.enable(wallBlock, Phaser.Physics.ARCADE);
	wallBlock.body.immovable = true;
	wallBlock.body.allowGravity = false;
	this.walls.add(wallBlock);
	var wallBlock = this.game.add.sprite(this.game.width + 18, this.game.height - 32, 'ground');
	wallBlock.anchor.setTo(0.5, 0.5);
	this.game.physics.enable(wallBlock, Phaser.Physics.ARCADE);
	wallBlock.body.immovable = true;
	wallBlock.body.allowGravity = false;
	this.walls.add(wallBlock);

	// Create a group for explosions
	this.explosionGroup = this.game.add.group();

	// Create a enemy group
	this.enemyPool = this.game.add.group();
	for(var i = 0; i < this.NUMBER_OF_ENEMIES; i++) {
		// Create each enemy and add it to the group.
		var enemy = this.game.add.sprite(0, 0, 'bullet');
		this.enemyPool.add(enemy);

		// Set its pivot point to the center of the enemy
		enemy.anchor.setTo(0.5, 0.5);

		// Enable physics on the enemy
		this.game.physics.enable(enemy, Phaser.Physics.ARCADE);

		// Set its initial state to "dead".
		enemy.kill();
	}


	// Show FPS
	this.game.time.advancedTiming = true;
	this.fpsText = this.game.add.text(
			20, 20, '', { font: '16px Arial', fill: '#ffffff' }
			);
};

GameState.prototype.shootBullet = function() {
	// Enforce a short delay between shots by recording
	// the time that each bullet is shot and testing if
	// the amount of time since the last shot is more than
	// the required delay.
	if (this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
	if (this.game.time.now - this.lastBulletShotAt < this.SHOT_DELAY) return;
	this.lastBulletShotAt = this.game.time.now;

	// Get a dead bullet from the pool
	var bullet = this.bulletPool.getFirstDead();

	// If there aren't any bullets available then don't shoot
	if (bullet === null || bullet === undefined) return;

	// Revive the bullet
	// This makes the bullet "alive"
	bullet.revive();

	// Bullets should kill themselves when they leave the world.
	// Phaser takes care of this for me by setting this flag
	// but you can do it yourself by killing the bullet if
	// its x,y coordinates are outside of the world.
	bullet.checkWorldBounds = true;
	bullet.outOfBoundsKill = true;

	// Set the bullet position to the gun position.
	bullet.reset(this.gun.x, this.gun.y);

	// Shoot it
	bullet.body.velocity.x = 0;
	bullet.body.velocity.y = -this.BULLET_SPEED;
};

GameState.prototype.shootEnemy = function() {
	// Enforce a short delay between shots by recording
	// the time that each enemy is shot and testing if
	// the amount of time since the last shot is more than
	// the required del2.
	if (this.lastEnemyShotAt === undefined) this.lastEnemyShotAt = 0;
	if (this.game.time.now - this.lastEnemyShotAt < this.ENEMY_DELAY) return;
	this.lastEnemyShotAt = this.game.time.now;

	// Get a dead bullet from the pool
	var enemy = this.enemyPool.getFirstDead();
	// If there aren't any bullets available then don't shoot
	if (enemy === null || enemy === undefined) return;

	// Revive the bullet
	// This makes the bullet "alive"
	enemy.revive();

	// Bullets should kill themselves when they leave the world.
	// Phaser takes care of this for me by setting this flag
	// but you can do it yourself by killing the bullet if
	// its x,y coordinates are outside of the world.
	enemy.checkWorldBounds = true;
	enemy.outOfBoundsKill = true;

	// Set the bullet position to the gun position.
	enemy.reset(Math.floor((Math.random() * (this.game.width - 60))), 30);

	// Shoot it
	enemy.body.velocity.x = 0;
	enemy.body.velocity.y = this.ENEMY_SPEED;
};

// The update() method is called every frame
GameState.prototype.update = function() {
	if (this.game.time.fps !== 0) {
		this.fpsText.setText(this.game.time.fps + ' FPS');
	}

	// Shoot a bullet
	if (this.game.input.activePointer.isDown || this.spaceInputIsActive()) {
		this.shootBullet();
	}

	// Shoot an enemy
	this.shootEnemy();

	// Check if bullets have collided with the ground
	this.game.physics.arcade.collide(this.bulletPool, this.enemyPool, function(bullet, enemy) {
		// Create an explosion
		this.getExplosion(bullet.x, bullet.y);

		// Kill the bullet
		bullet.kill();
		enemy.kill();
	}, null, this);

	// Collide the player with the ground
	this.game.physics.arcade.collide(this.gun, this.walls);

	if (this.leftInputIsActive()) {
		// If the LEFT key is down, set the player velocity to move left
		this.gun.body.velocity.x = -this.GUN_MOVE_SPEED;
	} else if (this.rightInputIsActive()) {
		// If the RIGHT key is down, set the player velocity to move right
		this.gun.body.velocity.x = this.GUN_MOVE_SPEED;
	} else {
		// Stop the player from moving horizontally
		this.gun.body.velocity.x = 0;
	}
};


// This function should return true when the player activates the "go left" control
// In this case, either holding the right arrow or tapping or clicking on the left
// side of the screen.
GameState.prototype.leftInputIsActive = function() {
	var isActive = false;

	isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);

	return isActive;
};


// This function should return true when the player activates the "go right" control
// In this case, either holding the right arrow or tapping or clicking on the right
// side of the screen.
GameState.prototype.rightInputIsActive = function() {
	var isActive = false;

	isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);

	return isActive;
};

// This function should return true when the player activates the "go right" control
// In this case, either holding the right arrow or tapping or clicking on the right
// side of the screen.
GameState.prototype.spaceInputIsActive = function() {
	var isActive = false;

	isActive = this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);

	return isActive;
};

// Try to get a used explosion from the explosionGroup.
// If an explosion isn't available, create a new one and add it to the group.
// Setup new explosions so that they animate and kill themselves when the
// animation is complete.
GameState.prototype.getExplosion = function(x, y) {
	// Get the first dead explosion from the explosionGroup
	var explosion = this.explosionGroup.getFirstDead();

	// If there aren't any available, create a new one
	if (explosion === null) {
		explosion = this.game.add.sprite(0, 0, 'explosion');
		explosion.anchor.setTo(0.5, 0.5);

		// Add an animation for the explosion that kills the sprite when the
		// animation is complete
		var animation = explosion.animations.add('boom', [0,1,2,3], 60, false);
		animation.killOnComplete = true;

		// Add the explosion sprite to the group
		this.explosionGroup.add(explosion);
	}

	// Revive the explosion (set it's alive property to true)
	// You can also define a onRevived event handler in your explosion objects
	// to do stuff when they are revived.
	explosion.revive();

	// Move the explosion to the given coordinates
	explosion.x = x;
	explosion.y = y;

	// Set rotation of the explosion at random for a little variety
	explosion.angle = this.game.rnd.integerInRange(0, 360);

	// Play the animation
	explosion.animations.play('boom');

	// Return the explosion itself in case we want to do anything else with it
	return explosion;
};

var game = new Phaser.Game(450, 848, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);
