const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ejs = require('ejs');
const helmet = require('helmet');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const listRouter = require('./routes/list');

const db = require('./lib/db.js');


const app = express();

app.use(helmet({crossOriginResourcePolicy: false,crossOriginEmbedderPolicy: false}));



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/list', listRouter);

app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;
