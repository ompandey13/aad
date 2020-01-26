var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/tasks', passport.authenticate('oauth-bearer', {
	    session: false
	}), (req, res, next) => {
	return res.send('hello_world').end();
});

module.exports = router;
