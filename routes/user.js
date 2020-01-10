let express = require('express');
let router = express.Router();
let passport = require('passport');

router.get('/profile', isLoggedIn, function(req, res, next){
	res.render('user/profile');
}); 

router.get('/logout',isLoggedIn,function(req,res,next){
	req.logout();
	res.redirect('/');
});


router.use('/',isNotLoggedIn,function(req,res,next){
	next();
});
router.get('/signup',function(req, res, next){
	var messages = req.flash('error');

	res.render('user/signup',{ messages : messages,hasErrors:messages.length > 0});
});


router.post('/signup',passport.authenticate('local.signup',{
	successRedirect: '/user/profile',
	failureRedirect: '/user/signup',
	failureFlash: true
}));

router.get('/signin',function(req, res, next){
	var messagesin = req.flash('error');

	res.render('user/signin',{ messages : messagesin,hasErrors:messagesin.length > 0});
}); 
router.post('/signin',passport.authenticate('local.signin', {
	successRedirect: '/user/profile',
	failureRedirect: '/user/signin',
	failureFlash: true
}));



module.exports = router; 

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}
function isNotLoggedIn(req,res,next){
	if(!req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
	
}