var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
let expressHbs = require('express-handlebars')
let session = require('express-session');
let passport = require('passport');
let flash = require('connect-flash');
let validator = require('express-validator');
var MongoStore = require('connect-mongo');
var indexRouter = require('./routes/index');

let userRouter = require('./routes/user');

var app = express();
mongoose.connect('mongodb://localhost:27017/hamza',{useNewUrlParser:true});
require('./config/passport.js');
// view engine setup
app.engine('.hbs',expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(validator());
app.use(session({
secret:'mysupersecret',
resave:false,
saveUninitialized:false,
store: new MongoStore({mongooseConnection: mongoose.connection}),
cookie: { maxAge: 180 * 60 * 1000}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  res.locals.logged = req.isAuthenticated();
  res.locals.session = req.session;
	next();
});

app.use('/user',userRouter);//the order is so important
app.use('/', indexRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
