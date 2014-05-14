// This example uses the Phaser 2.0.4 framework

// Copyright © 2014 John Watson
// Licensed under the terms of the MIT License

var GameState = function(game) {
};

// Load images and sounds
GameState.prototype.preload = function() {
	this.game.load.spritesheet('player', '/assets/BigG.png', 400, 311);
	this.game.load.spritesheet('bullet', '/assets/ball.png', 300, 292);
	this.game.load.image('ground', '/assets/gfx/ground.png');
	this.game.load.spritesheet('explosion', '/assets/gfx/explosion.png', 128, 128);
	this.game.load.spritesheet('monster', '/assets/bird.png', 300, 600);
	this.game.load.spritesheet('sky', '/assets/background.png', 450, 450);
};

// Setup the example
GameState.prototype.create = function() {
	// Set stage background color
	this.game.stage.backgroundColor = 0x4488cc;

	//Background of our game
	this.sky = game.add.sprite(0, 0, 'sky');
	this.sky.scale.setTo(this.game.world.width / this.sky.width, this.game.world.height / this.sky.height);
	this.sky.animations.add('windy', [0,1,2,3], 2, true);
	this.sky.animations.play('windy');
	
	// Define constants
	this.SHOT_DELAY = 200; // milliseconds (10 bullets/second)
	this.BULLET_SPEED = 500; // pixels/second
	this.NUMBER_OF_BULLETS = 20;
	this.PLAYER_MOVE_SPEED = 400;
	this.ENEMY_DELAY = 500; // milliseconds (10 bullets/second)
	this.ENEMY_SPEED = 500; // pixels/second
	this.NUMBER_OF_ENEMIES = 20;

	// Create an object representing our player
	this.player = this.game.add.sprite(this.game.width - 4, this.game.height / 2, 'player');
	this.player.scale.setTo(0.4, 0.4);

	// Enable physics on the player
	this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

	// Set the pivot point to the center of the player
	this.player.anchor.setTo(1, 0.5);

	//Set immovable to character
	this.player.body.immovable = true;

	this.player.animations.add('strike', [0,1,2,3], 10, false);

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
		bullet.scale.setTo(0.1, 0.1);
		bullet.animations.add('rotate', [0,1,2], 10, true);

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
	var wallBlock = this.game.add.sprite(this.game.width - 32, -48, 'ground');
	wallBlock.anchor.setTo(0.5, 0.5);
	this.game.physics.enable(wallBlock, Phaser.Physics.ARCADE);
	wallBlock.body.immovable = true;
	wallBlock.body.allowGravity = false;
	this.walls.add(wallBlock);
	var wallBlock = this.game.add.sprite(this.game.width - 32, this.game.height + 36, 'ground');
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
		var enemy = this.game.add.sprite(0, 0, 'monster');
		enemy.scale.setTo(0.3, 0.3);
		enemy.animations.add('fly', [0,1], 5, true);
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
			20, 20, '', { font: '18px Arial', fill: '#254117' }
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

	// Set the bullet position to the player position.
	bullet.reset(this.player.x, this.player.y);

	// Shoot it
	bullet.body.velocity.x = -this.BULLET_SPEED;
	bullet.body.velocity.y = 0;

	//Animate it
	bullet.animations.play('rotate');
	this.player.animations.play('strike');
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

	// Set the bullet position to the player position.
	enemy.reset(30, Math.floor((Math.random() * (this.game.height - 60)) + 30.0));

	// Shoot it
	enemy.body.velocity.x = this.ENEMY_SPEED;
	enemy.body.velocity.y = 0;

	//Animate it
	enemy.animations.play('fly');
};

// The update() method is called every frame
GameState.prototype.update = function() {
	if (gameState == GAME_BEGIN) {
		//Start the game
		if (this.game.input.activePointer.isDown || this.spaceInputIsActive()) {
			gameStart();
			this.player.revive();
		}
		return ;
	}

	if (gameState == GAME_OVER) {
		//Start the game
		if (this.game.input.activePointer.isDown || this.spaceInputIsActive()) {
			gameBegin();
		}
		return ;
	}

	if (this.game.time.fps !== 0) {
		this.fpsText.setText(this.game.time.fps + ' FPS' + ' Score:' + score);
	}

	// Shoot a bullet
	if (this.game.input.activePointer.isDown || this.spaceInputIsActive()) {
		this.shootBullet();
	}

	// Shoot an enemy
	this.shootEnemy();

	// Check if bullets have collided with the enemy
	this.game.physics.arcade.collide(this.bulletPool, this.enemyPool, function(bullet, enemy) {
		// Create an explosion
		this.getExplosion(bullet.x, bullet.y);

		//Count score
		hitEnemy();

		// Kill the bullet
		bullet.kill();
		enemy.kill();
	}, null, this);


	// Check if player have collided with the enemy
	this.game.physics.arcade.collide(this.player, this.enemyPool, function(player, enemy) {
		// Create an explosion
		this.getExplosion(player.x, player.y);

		//Count score
		hitPlayer();

		// Kill the bullet
		player.kill();
		enemy.kill();
	}, null, this);

	// Collide the player with the ground
	this.game.physics.arcade.collide(this.player, this.walls);

	if (this.upInputIsActive()) {
		// If the LEFT key is down, set the player velocity to move left
		this.player.body.velocity.y = -this.PLAYER_MOVE_SPEED;
	} else if (this.downInputIsActive()) {
		// If the RIGHT key is down, set the player velocity to move right
		this.player.body.velocity.y = this.PLAYER_MOVE_SPEED;
	} else {
		// Stop the player from moving horizontally
		this.player.body.velocity.y = 0;
	}
};


// This function should return true when the player activates the "go left" control
// In this case, either holding the right arrow or tapping or clicking on the left
// side of the screen.
GameState.prototype.upInputIsActive = function() {
	var isActive = false;

	isActive = this.input.keyboard.isDown(Phaser.Keyboard.UP);

	return isActive;
};


// This function should return true when the player activates the "go right" control
// In this case, either holding the right arrow or tapping or clicking on the right
// side of the screen.
GameState.prototype.downInputIsActive = function() {
	var isActive = false;

	isActive = this.input.keyboard.isDown(Phaser.Keyboard.DOWN);

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

var game = new Phaser.Game(800, 400, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);
