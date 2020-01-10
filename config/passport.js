let passport =  require('passport');
let User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
let bcrypt = require('bcrypt-nodejs');

passport.serializeUser(function (user,done) {
	done(null,user.id);
});

passport.deserializeUser(function (id,done) {

	User.findById(id,function (err,user) {
		done(err,user);
	});
});

passport.use('local.signup', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback:true
}, function(req, email, password, done){
	let firstName = req.body.firstName;
	let lastName = req.body.lastName;
	req.checkBody('firstName',"First Name is required").notEmpty();
	req.checkBody('lastName',"lastName Name is required").notEmpty();
	req.checkBody('email', 'Invalid email').notEmpty().isEmail(); 
	req.checkBody('password', 'Invalid password').notEmpty().isLength({min:4}); 
	var errors = req.validationErrors();
	if(errors){
		var messages =[];
		errors.forEach(function (error) {
			messages.push(error.msg);
		});
		return done(null, false, req.flash('error',messages));
	}

	User.findOne({'email': email},function(err, user){
		if(err)
			return done(err);
		if(user)
			return done(null, false,{message:'Email is already in use dude'});
  
		let newUser = new User();
		newUser.email = email;
		newUser.password = newUser.encryptPassword(password);
		newUser.firstName = req.body.firstName;
		newUser.lastName =req.body.lastName;
		newUser.phoneNumber = req.body.phoneNumber;
		newUser.save(function(err,result){
			if(err){
				return done(err);
			}
			return done(null,newUser);
		});
	});
}));


passport.use('local.signin', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback:true
}, function(req, email, password, done){

	req.checkBody('email', 'Invalid email').notEmpty().isEmail(); 
	req.checkBody('password', 'Invalid password').notEmpty(); 
	var errors = req.validationErrors();

	if(errors){
		var messages =[];
		errors.forEach(function (error) {
			messages.push(error.msg);
		});
		return done(null, false, req.flash('error',messages));
	}

	User.findOne({'email': email},function(err, user){
		if(err){
			return done(err);
		}
		if(!user){
			return done(null, false, {message:"This email doesn't exist in database"});
		}
  		if(!bcrypt.compareSync(password,user.password)){
  			return done(null,false,{message: 'Wrong Password'});
  		}
  		
  		return done(null,user); 

  		

	});
}));

