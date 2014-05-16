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
	var name = prompt("Enter your Name :");
	if(name) {
		$.post('/db',{"Name":name,"Score":score}, function(data){
    		var content = '';
    		for (i in data){
    			console.log(data[i]);
    			content += '<p class="list-group-item">' + data[i].Name +' : ' + data[i].Score + '</p>';
    		}
    		$("#score_board").html(content); 
		});
	}
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
	game.state.start('game_play');
}

function gameBegin()
{
	gameState = GAME_BEGIN;
	game.state.start('game_menu');
}
//==========================================================

//Speech Recognition
recognition = null;
isSpeechShoot = false;
isSpeechUp = false;
isSpeechDown = false;
isSpeechBomb = false;

shoot_words = ['shoot','suit','soup','tits','2','shou*d','shoe','sue'];
up_words = ['up','pop','hot','op','hop','app','hub','Apple','up','cop','f\\*','pop','top'];
down_words = ['down','song','dial','dong','town','Dow','Don','thong','phone','s\\*','set','pussy','push'];
