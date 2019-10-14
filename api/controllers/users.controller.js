const User = require('../models/user.model');

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
        const newUser = new User(req.body);
        newUser.save()
        .then(user => {
            console.log(user);
           // res.status(201).json(user);
        })
        .catch(err =>{
            next(err);
        })
    },
}