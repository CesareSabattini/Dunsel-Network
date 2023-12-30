const express= require('express');
const router= express.Router();
const {createCommunity, getCommunities, getCommunity, addToCommunity, addPost, leaveCommunity, postComment, getFeedPosts}= require('../controllers/community.js');
const { deletePost } = require('../controllers/post.js');

router.post('/create', createCommunity);

router.get('/getCommunities', getCommunities);

router.get('/get/:communityName', getCommunity);

router.post('/:userName/addTo/:communityName', addToCommunity);

router.post('/addPost', addPost);

router.post('/:userName/leaves/:communityName', leaveCommunity)

router.post('/postComment', postComment);

router.get('/getFeedPosts/:userName', getFeedPosts);

module.exports= router;