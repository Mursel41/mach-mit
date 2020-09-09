<<<<<<< HEAD
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

=======
const express = require("express");
>>>>>>> 05bf8b6afe7dbef80cb2386c0acd61343f3cf064

const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

<<<<<<< HEAD
mongoose
    .connect('mongodb://127.0.0.1:27017/mach-mit', {
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .catch(err => console.error(err));
mongoose.connection.on('open', () => console.log('MongoDB running'));
mongoose.connection.on('error', (err) => console.error(err));

app.use(logger('dev'));
=======
app.use(logger("dev"));
>>>>>>> 05bf8b6afe7dbef80cb2386c0acd61343f3cf064
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
