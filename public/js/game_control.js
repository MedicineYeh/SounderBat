GAME_BEGIN = 0;
GAME_PLAY = 1;
GAME_OVER = 2;

score = 0;
gameState  = GAME_BEGIN;

//========================Game State========================
//These are read only, DO NOT call these two at this file.
function hitEnemy()
{
	score++;
}

function hitPlayer()
{
	gameState = GAME_OVER;
}

//==========================================================

//=======================Game Control=======================
//Use these functions to control game state.
function clearScore()
{
	score = 0;
}

function gameStart()
{
	gameState = GAME_PLAY;
	clearScore();
}

function gameBegin()
{
	gameState = GAME_BEGIN;
}
//==========================================================
