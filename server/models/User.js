const mongoose= require('mongoose');

const UserSchema= new mongoose.Schema({
    firstName:{
        type: String,
        required: [true,'this field is required'],
        
    },
    lastName:{
        type: String,
        required: [true,'this field is required']
    },
    email:{
        type: String,
        required: [true,'this field is required'],
        unique: [true, 'this email has already been registered'],
        validate: {
            validator: function (value) {
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email address',
          }
    },
    userName:{
        type: String,
        required: [true,'this field is required'],
        unique: [true, 'this username already exists, choose another one'],
        maxLength: [30, 'the username is too long'],
        minLength: [3, 'the username is too short']
    },
    password:{
        type: String,
        required: [true,'this field is required']
       
    },
    isValid:{
        type:Boolean,
        required:true
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
    },
    description:{
        type: String
    }
    
}, {timestamps: true});

const User= mongoose.model('User', UserSchema);

module.exports= User;