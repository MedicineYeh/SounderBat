var GameMenu = function(game) {
};

// Load images and sounds
GameMenu.prototype.preload = function() {
	this.game.load.spritesheet('player', '/assets/BigG.png', 400, 311);
	this.game.load.spritesheet('bullet', '/assets/ball.png', 300, 292);
	this.game.load.spritesheet('sky', '/assets/background.png', 450, 450);
};

// Setup the example
GameMenu.prototype.create = function() {
	// Set stage background color
	this.game.stage.backgroundColor = 0x4488cc;

	//Background of our game
	this.sky = game.add.sprite(0, 0, 'sky');
	this.sky.scale.setTo(this.game.world.width / this.sky.width, this.game.world.height / this.sky.height);
	this.sky.animations.add('windy', [0,1,2,3], 2, true);
	this.sky.animations.play('windy');
	
	// Create an object representing our player
	this.player = this.game.add.sprite(this.game.world.width * 2 / 5, this.game.world.height / 2, 'player');

	// Enable physics on the player
	this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

	// Set the pivot point to the center of the player
	this.player.anchor.setTo(1, 0.5);

	// Show FPS
	this.game.time.advancedTiming = true;
	this.fpsText = this.game.add.text(
			20, 20, '', { font: '18px Arial', fill: '#254117' }
			);
	this.gameText = this.game.add.text(
		this.game.world.width * 2 / 3, this.game.world.height / 2, '', { font: '72px Arial', fill: '#3810f8' }
	);
	this.gameText.anchor.setTo(0.5, 0.5);
};

GameMenu.prototype.update = function() {
	if (this.spaceInputIsActive()) {
		gameStart();
		this.player.revive();
	}

	if (this.game.time.fps !== 0) {
		this.fpsText.setText(this.game.time.fps + ' FPS');
	}

	this.gameText.setText('Big G\nPlay Ball');
};

GameMenu.prototype.spaceInputIsActive = function() {
	var isActive = false;

	isActive = this.input.keyboard.isDown(Phaser.Keyboard.ENTER);

	return isActive;
};

