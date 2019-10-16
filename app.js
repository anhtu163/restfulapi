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

// Middlewares


app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/user',userRoute);

app.use('/auth',authRoute);
// Routes

app.get('/',(req,res,next)=>{
    res.status(200).json({
        message: "You are in homepage"
    });
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

