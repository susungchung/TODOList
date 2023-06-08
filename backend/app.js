const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ejs = require('ejs');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

require('dotenv').config()

const db = require('./lib/db.js');


const app = express();

app.use(helmet({crossOriginResourcePolicy: false,crossOriginEmbedderPolicy: false}));

// cors
app.use(cors());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.set('views', path.join(__dirname, 'views'));

// routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const listRouter = require('./routes/list');
const authRouter = require('./routes/auth');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/list', listRouter);
app.use('/auth',authRouter);


app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
