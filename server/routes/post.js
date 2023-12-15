const express= require('express');
const {verifyToken}= require('../middleware/auth')
const { createPost, getPosts } = require('../controllers/post');

const router= express.Router();

router.post('/create', (req,res)=>{createPost(req,res)});

router.get('/getPosts', getPosts)
module.exports= router;