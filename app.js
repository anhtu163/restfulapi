// Define dependences
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const db = require('./api/utils/db')
const passport    = require('passport');
const jwt = require('jsonwebtoken')
//Import routes
const userRoute = require('./api/routes/users.route');

require('./api/middlewares/passport');

const authRoute = require('./api/routes/auth.route')

const app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

// Middlewares
require('./api/middlewares/session')(app)
require('./api/middlewares/passport')(app)
app.use(require('./api/middlewares/auth-local'))

app.use(logger('dev'))

//app.use(passport.initialize());
//app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(function( req, res, next) {
    res.locals.user = req.user||null;
    next();
  });

app.use('/user',userRoute);

app.use('/auth',authRoute);
// Routes

app.get('/',(req,res,next)=>{
    res.status(200).json({
        message: "You are in homepage"
    });
})
app.get('/me',(req,res)=>{
    console.log(req.user)
    res.status(200).json(
        req.user
    );
})

// Catch 404 Error
app.use((req,res,next)=>{
    const err = new Error('Not found!');
    err.status = 404;
    next(err);
})

// Error handler function
app.use((req,res,next)=>{
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    res.status(status).json({
        error:{
            message: error.message
        }
    })
})

module.exports = app;

