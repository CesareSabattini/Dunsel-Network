const mongoose= require('mongoose');

const UserSchema= new mongoose.Schema({
    firstName:{
        type: String,
        require: true
    },
    lastName:{
        type: String,
        require: true
    },
    userName:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    
}, {timestamps: true});

const User= mongoose.model('User', UserSchema);

module.exports= User;