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
            phone: req.body.phone,
            image: ""
        });
        User.findOne({"username":newUser.username}),(err,user)=>{
            if(user){
                res.status(500)
            }
        }
        newUser.save()
        .then(user => {
           //const token = jwt.sign(user,'huynhanh'); 
           res.status(200).json(user);
        })
        .catch(err =>{
            res.status(400).json(err);
        })
    },

    updateUser: (req,res,next)=>{
        

        User.findOne({"username": req.body.username},(err,user)=>{
            user.name = req.body.name;
            user.phone = req.body.phone;
            user.image = req.body.image;
            user.save();
            return res.status(200).json(user);
        })
    },

    changePassUser: (req,res,next) =>{
        User.findOne({"username":req.body.username},(err,user)=>{
           if (! bcrypt.compareSync(req.body.password,user.password)) { 
                return res.status(400)
            }
            user.password = bcrypt.hashSync(req.body.newpassword,10),
            user.save()
            return res.status(200).json(user);
        }).catch(err =>{
            next(err)
        })
    },

    getInforUser: (req, res, next) => {
        res.status(200).json(req.user);
    },
}