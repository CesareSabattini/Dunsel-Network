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
    followers:{
        type: Array
    },
    followed:{
        type: Array
    },
    profilePhoto:{
        type: String
    },
    communities:{
        type: Array 
    }
    
}, {timestamps: true});

const User= mongoose.model('User', UserSchema);

module.exports= User;