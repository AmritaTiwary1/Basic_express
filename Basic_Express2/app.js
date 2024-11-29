var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const session = require('express-session');//required express-session to use in session variable

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//using express-session
app.use(session({          //here, session is written bcoz we have required express-session in session variable
  secret: 'dev',           //it(dev) can be anything
  resave: false,           //it means that until values of session dont get change ,it will not resave things on server,but once value get change,we will automatically update the value
  saveUninitialized: false, //the data whose name is not given,or user is sending unnecessary data, false will not allow data to use stoage of session 
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));  
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
