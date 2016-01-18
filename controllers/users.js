var User = require('../models/users');


exports.userRegister = function (fields, sucCb, errCb) {
	var email= fields.email.toString(),
		password= fields.password.toString(),
		first_name= helper.capitalizeFirstLetter(fields.first_name.toString()),
		last_name= helper.capitalizeFirstLetter(fields.last_name.toString()),
		phone= fields.phone.toString(),
		error = 0;
	var user = new User({
		email: email,
		password: password,
		first_name: first_name,
		last_name: last_name,
		// picture: destPath.toString(),
		phone: phone
	});
	user.save(function(err) {
		if (err) throw err;
		console.log('User saved successfully!');
	});
	if(error == 1){
		errCb(constants.UN_FILE_TYPE);
	} else {
		sucCb(1);
	}
}

