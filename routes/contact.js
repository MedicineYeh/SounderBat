exports.contact = function(req,res){
	content = '' + 
	'<p><h2><span class="label label-default">GitHub</span>:<a href="https://github.com/MedicineYeh/SounderBat">https://github.com/MedicineYeh/SounderBat</a></h2></p>' +
	'<ul>' +
		'<li class="disc"><img style="width:150px" src="http://140.112.90.56/photo1.jpg" class="img-thumbnail"></img>吳文傑：組長，E-mail:jeromewus@gmail.com</li>' +
		'<li class="disc"><img style="width:150px" src="http://140.112.90.56/photo2.jpg" class="img-thumbnail"></img>葉志威，E-mail:medicinehy@gmail.com</li>' +
		'<li class="disc"><img style="width:150px" src="http://140.112.90.56/photo3.jpg" class="img-thumbnail"></img>林冠儒，E-mail:g548462@gmail.com</li>' +
		'<li class="disc"><img style="width:150px" src="http://140.112.90.56/photo4.jpg" class="img-thumbnail"></img>葉婉婷，E-mail:stacy0416@gmail.com</li>' +
	'</ul>';
	

	res.send(content);
};
