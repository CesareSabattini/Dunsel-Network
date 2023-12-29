const express= require('express');
const router= express.Router();
const {createCommunity, getCommunities, getCommunity, addToCommunity, addPost, leaveCommunity}= require('../controllers/community.js');
const { deletePost } = require('../controllers/post.js');

router.post('/create', createCommunity);

router.get('/getCommunities', getCommunities);

router.get('/get/:communityName', getCommunity);

router.post('/:userName/addTo/:communityName', addToCommunity);

router.post('/addPost', addPost);

router.post('/:userName/leaves/:communityName', leaveCommunity)

module.exports= router;