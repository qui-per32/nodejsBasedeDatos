var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
let ExpressSessions = require('express-session');
let flash = require('connect-flash');
const logger = require('./configuration/winston');
const winston = require('winston');
const hbsEmail = require('nodemailer-express-handlebars');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let admin = require('./routes/admin');
let loginFlash = require('./routes/login-flash');
let integration = require('./routes/integration');
let regeneration = require('./routes/regeneration');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


//GESTION DE SESIONES

app.use(ExpressSessions({
  secret: 'GeekshubsAcademy',
  name: 'SesionGeek',
  resave: true,
  saveUninitialized: true
}));

app.use(flash());


// app.use(logger('dev'));
app.use(logger('combined', {stream: winston.stream}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', admin);
app.use('/login-flash', loginFlash);
app.use('/integration', integration);
app.use('/regeneration', regeneration);
app.use('/?:hash', integration);

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
