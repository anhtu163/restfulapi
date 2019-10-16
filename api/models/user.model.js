const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

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
/*userSchema.methods = {
    hashPassword(password) {
        return bcrypt.hashSync(password,'huynhanh');
    },
    authenticateUser(password) {
        return bcrypt.compareSync(password, this.password);
    },
};*/
/*userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hash(this.password,'huynhanh');
    }
    return next();
});*/


const User = mongoose.model('user', userSchema);

module.exports = User;