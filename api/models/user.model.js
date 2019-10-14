const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    phone:{
        type: String
    }

});

const User = mongoose.model('user', userSchema);

module.exports = User;