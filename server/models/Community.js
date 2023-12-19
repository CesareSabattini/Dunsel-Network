const mongoose= require('mongoose');

const communitySchema= new mongoose.Schema({
    communityName:{
        type: String
    },
    communityTheme:{
        type: String
    },
    communityDescription:{
        type: String
    },
    members:{
        type: Array
    },
    posts:{
        type: Array
    }

});

const Community= mongoose.model('Community', communitySchema);
module.exports= {Community};