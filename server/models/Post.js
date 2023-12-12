const mongoose= require('mongoose');

const postSchema= new mongoose.Schema({
    userName:{
        type: String,
        require: true
    },
    url:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    comments:{
        type: Array,
        default:[]
    }
},{timestamps:true})

const Post= mongoose.model('Post', postSchema);
module.exports= {Post}