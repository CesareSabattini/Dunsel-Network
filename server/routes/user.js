const express= require('express');
const router= express.Router();
const {signIn, logIn, getUser, setProfilePhoto, getProfilePhoto, addFollowed, updateDescription, validateUser}= require('../controllers/user')
const {verifyToken}= require('../middleware/auth')




router.post('/signIn',(req, res)=>{
    signIn(req.body, res);
    });

router.post('/logIn', logIn);

router.get('/:userName', verifyToken, getUser);

router.post('/setProfilePhoto',verifyToken, setProfilePhoto);

router.get('/getProfilePhoto', verifyToken, getProfilePhoto);

router.post('/addFollowed', verifyToken, addFollowed);

router.post('/description/update', updateDescription);

router.get('/verify/:userName', validateUser)

module.exports= router;