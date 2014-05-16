
/*
 * GET home page.
 */

var db_name = 'SounderBarDB';
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/SounderBarDB');
var collection = db.get('record_collection');

exports.index = function(req, res){

  collection.find({},{limit:5,sort:{"Score":-1}},function(err,data){
    res.render('index',{title:'Shout2Play','score_list':data});
  });
};
