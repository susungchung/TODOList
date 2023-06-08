const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ejs = require('ejs');
const helmet = require('helmet');
const cors = require('cors');

const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

require('dotenv').config()

const db = require('./lib/db.js');


const app = express();

app.use(helmet({crossOriginResourcePolicy: false,crossOriginEmbedderPolicy: false}));

// cors
//app.use(cors());
app.use(
    cors({
        credentials: true, 
        origin: function (origin, callback) {
            if (process.env.CORS_WHITELIST.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        }
    })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use(session({
    store: new pgSession({
        pool:db,
        tableName: 'user_sessions'
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
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
