
const mongoose = require('mongoose');

const userschema = mongoose.Schema({

    firstname : {type:String, required:true},
    lastname : {type:String, required:true},
    email : {type:String, required:true, unique:true}
})

module.exports = mongoose.model('users',userschema);