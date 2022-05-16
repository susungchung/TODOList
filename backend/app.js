const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ejs = require('ejs');
const helmet = require('helmet');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const listRouter = require('./routes/list');

const db = require('./lib/db.js');


const app = express();

app.use(helmet());



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.set('view engine','ejs');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/list', listRouter);

app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;
