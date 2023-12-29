const express= require('express');
const {verifyToken}= require('../middleware/auth')
const { createPost, getPosts, deletePost } = require('../controllers/post');

const router= express.Router();

router.post('/create', (req,res)=>{createPost(req,res)});

router.get('/get/:userName', getPosts);


router.delete('/delete/:userName/:postId', deletePost);
module.exports= router;