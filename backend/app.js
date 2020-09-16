// External Dependencies
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// internal Dependencies
const indexRouter = require('./routes/index');
const activitiesRouter = require('./routes/activitiesRoute');
const usersRouter = require('./routes/usersRoute');
const categoriesRouter = require('./routes/categoriesRoute');
const CORS = require('./middleware/CORS');
const { error400, handleErrors } = require('./middleware/errors');

// Initialization
const app = express();

// Initialize Mongoose
mongoose
  .connect('mongodb://127.0.0.1:27017/machMit', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((err) => console.error(err));
mongoose.connection.on('open', () => console.log('MongoDB running'));
mongoose.connection.on('error', (err) => console.error(err));

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(CORS);

// Routers
app.use('/', indexRouter);
app.use('/api/v1/activities', activitiesRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/categories', categoriesRouter);

// If route does not match
app.use(error400);

// Global error Handling
app.use(handleErrors);

module.exports = app;
