var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var stylus = require('stylus');
var fileUpload = require('express-fileupload');
var mongoose = require('mongoose');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/apnotpan');
var axios = require('axios');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var musiquesPlayer = require('./routes/musiques');
var musiquesRouter = require('./routes/musiques');
var apiRouter = require('./api/rest');
var apnotpanRouter = require('./routes/apnotpan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Configuration de mongoose
mongoose.connect('mongodb://localhost/apnotpan', { // port de ma mongo 127.0.0.1 : 27017 
  useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true
});
var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function () {
  console.log("Connection Mongoose ok !");
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  req.db = db;
  next();
 });

app.use(fileUpload({
  createParentPath: true,
  useTempFiles: true,
  tempFileDir: path.join(__dirname, 'temp')
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/player', musiquesPlayer);
app.use('/musiques', musiquesRouter);
app.use('/apnotpan', apnotpanRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
