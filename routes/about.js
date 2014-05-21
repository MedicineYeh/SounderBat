exports.about = function(req,res){
	content= '' +
    '<h2>所使用到的技術、API</h2> ' + 
	'<h3 class="alert alert-info"><b>Server: Nodejs</b></h3>' +
    '<h3 class="alert alert-info"><b>DataBase: MongoDB</b></h3>' +
    '<h3 class="alert alert-info"><b>Game API: Phaser</b></h3>' +
    '<h3 class="alert alert-info"><b>JQuery Library</b></h3>' +
    '<h3 class="alert alert-info"><b>Front-end CSS framework: Bootstrap</b></h3>' +
    '<h3 class="alert alert-info"><b>HTML5 Speech recognition</b></h3>';

	res.send(content);
};