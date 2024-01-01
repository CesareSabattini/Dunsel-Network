const express= require('express');
const router= express.Router();
const {createCommunity, getCommunities, getCommunity, addToCommunity, addPost, leaveCommunity, postComment, getFeedPosts}= require('../controllers/community.js');
const { deletePost } = require('../controllers/post.js');
const { verifyToken } = require('../middleware/auth.js');

router.post('/create', verifyToken, createCommunity);

router.get('/getCommunities', verifyToken, getCommunities);

router.get('/get/:communityName', verifyToken, getCommunity);

router.post('/:userName/addTo/:communityName', verifyToken, addToCommunity);

router.post('/addPost', verifyToken, addPost);

router.post('/:userName/leaves/:communityName',verifyToken, leaveCommunity)

router.post('/postComment',verifyToken, postComment);

router.get('/getFeedPosts/:userName', verifyToken, getFeedPosts);

module.exports= router;