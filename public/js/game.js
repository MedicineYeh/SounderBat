var game = new Phaser.Game(800, 400, Phaser.AUTO, 'game');
game.state.add('game_play', GamePlay, true);
game.state.add('game_menu', GameMenu, true);

game.state.start('game_menu');
