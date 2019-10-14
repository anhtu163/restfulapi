const mongoose = require('mongoose');
require('dotenv/config')

const URL = process.env.DB_CONNECTION;

const connect = mongoose.connect(URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
},(err)=>{
    if(err) {
        console.log(err);
    }
    else{
        console.log("Connect Successful");
    }

});


module.exports = connect;

