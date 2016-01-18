var express = require('express'),
	router = express.Router(),
	User = require('../models/users'),
	userCb = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Welcome to User');
});

router.post('/signup', function(req, res) {
	var fields = req.body;
	userCb.userRegister(fields, function(sucObj) {
		res.redirect('signin');
	}, function(errObj) {
		res.redirect('signup');
	});
});

module.exports = router;
