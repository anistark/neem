var User = require('../models/users');


exports.userRegister = function (fields, sucCb, errCb) {
	if(fields.reqType == '0') {
		var email= fields.email.toString(),
			password= fields.password.toString(),
			first_name= helper.capitalizeFirstLetter(fields.first_name.toString()),
			last_name= helper.capitalizeFirstLetter(fields.last_name.toString()),
			phone= fields.phone.toString(),
			device_token= fields.device_token.toString(),
			device_type= fields.device_type.toString(),
			login_by= fields.login_by.toString();
	} else if(fields.reqType == '1') {
		var email= fields.email,
			password= fields.password,
			first_name= helper.capitalizeFirstLetter(fields.first_name),
			last_name= helper.capitalizeFirstLetter(fields.last_name),
			phone= fields.phone;
	}
	var error = 0;
	var user = new User({
		email: email,
		password: password,
		first_name: first_name,
		last_name: last_name,
		phone: phone,
		// picture: destPath.toString(),
		device_token: device_token,
		device_type: device_type,
		login_by: login_by
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

