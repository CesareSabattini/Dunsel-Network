const express= require('express');
const router= express.Router();
const {createCommunity, getCommunities, getCommunity, addToCommunity, addPost}= require('../controllers/community.js');

router.post('/create', createCommunity);

router.get('/getCommunities', getCommunities);

router.get('/community', getCommunity);

router.post('/addTo', addToCommunity);

router.post('/addPost', addPost);

module.exports= router;