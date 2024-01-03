const mongoose= require('mongoose');

const communitySchema= new mongoose.Schema({
    communityName:{
        type: String,
        required:true,
        unique: true
    },
    communityTheme:{
        type: String,
        required:true
    },
    communityDescription:{
        type: String,
        required:true
    },
    members:{
        type: Array
    },
    posts:{
        type: Array
    }

}, {timestamps: true});

const Community= mongoose.model('Community', communitySchema);
module.exports= {Community};