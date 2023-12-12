const express= require('express');
const {verifyToken}= require('../middleware/auth')
const { createPost, getPosts } = require('../controllers/post');

const router= express.Router();

router.post('/create', verifyToken, (req,res)=>{createPost(req,res)});

router.post('/getPosts', verifyToken, getPosts)
module.exports= router;