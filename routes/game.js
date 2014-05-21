exports.game = function(req,res){
	content = '' +
		'<div id="game" style="overflow: hidden;"><\/div>' + 
    	'<div>' +
    	  '<input type="button" onclick="gameStart();" value="GO" />' +
    		'<p>' +
        		'<ul>' + 
            		'<li type="disc">當你喊出<b class="bg-info"><font size="4">POP</font></b>時,角色會往<b class="bg-info"><font size="4">上方</font></b>移動</li>' +
            		'<li type="disc">當你喊出<b class="bg-info"><font size="4">PUSH</font></b>時,角色會往<b class="bg-info"><font size="4">下方</font></b>移動</li>' +
            		'<li type="disc">當你喊出<b class="bg-info"><font size="4">SHOOT、SHOO~</font></b>時,角色會<b class="bg-info"><font size="4">發射棒球</font></b></li>' +
            		'<li type="disc">當你喊出<b class="bg-info"><font size="4">BOOM</font></b>時,角色會<b class="bg-info"><font size="4">使用大招</font></b>消滅所有物體</li>' +
        		'</ul>' + 
            '</p>' +
        '</div>' +
        '<script src="/js/game_control.js">' + '<\/script>' + 
        '<script src="/js/game_play.js">' + '<\/script>' + 
        '<script src="/js/game_menu.js">' + '<\/script>' + 
        '<script src="/js/game.js">' + '<\/script>';
        
	res.send(content);
};
