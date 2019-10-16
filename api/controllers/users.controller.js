const User = require('../models/user.model');
const  jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const passport = require('../middlewares/passport')

module.exports = {
    indexUser: (req,res,next)=>{
        User.find()
        .then(user =>{
            console.log(user);
            res.status(200).json(user);
        })
        .catch(err=>{
            next(err);
        })    
    },

    newUser: (req,res,next)=>{
        const newUser = new User({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password,10),
            name: req.body.name,
            phone: req.body.phone
        });
        newUser.save()
        .then(user => {
            console.log(user);

           //const token = jwt.sign(user,'huynhanh'); 
           res.status(201).json(user);
        })
        .catch(err =>{
            next(err);
        })
    },

    getInforUser: (req, res, next) => {
        console.log(req.user || "Méo có user")
        res.status(200).json(req.user);
        //res.send(req.user);
    },
}