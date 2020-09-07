const express = require('express');
<<<<<<< HEAD
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
=======
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
>>>>>>> 01cfa313d827f61573e3446b84fd9ac7d13025ad

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
