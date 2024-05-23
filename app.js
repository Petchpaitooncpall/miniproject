var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');

var cookieParser = require('cookie-parser');
var reacts = require('react');
var reacts_dom = require('react-dom');
var logger = require('morgan');
const mysql = require('mysql2');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', 1) // trust first proxy

// Initialization
app.use(cookieParser());
 
app.use(session({
  secret: "primo",
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 600000 } // session timeout of 60 seconds
}));

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
