const express= require('express');
const {verifyToken}= require('../middleware/auth')
const { createPost, getPosts, deletePost } = require('../controllers/post');

const router= express.Router();

router.post('/create', verifyToken, (req,res)=>{createPost(req,res)});

router.get('/get/:userName',verifyToken, getPosts);


router.delete('/delete/:userName/:postId', verifyToken, deletePost);
module.exports= router;