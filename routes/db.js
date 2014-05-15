var mongo = require('mongodb');
var monk = require('monk');
var db_name = 'SounderBarDB';
var db = monk('localhost:27017/' + db_name);
var collection = db.get('record_collection');

exports.query = function(req , res){
  if(req.body.Name!=undefined)
    collection.insert({"Name":req.body.Name,"Score":parseInt(req.body.Score)});

  collection.find({},{limit:5,sort:{"Score":-1}},function(err,data){
    console.log("data-->"+data);
    res.send(data);
  });

};
