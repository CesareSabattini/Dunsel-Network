const express= require('express');
const router= express.Router();
const {signIn, logIn, getUser, setProfilePhoto, getProfilePhoto, addFollower}= require('../controllers/user')
const {verifyToken}= require('../middleware/auth')


router.post('/signIn',(req, res)=>{
    signIn(req.body, res);
    });

router.post('/logIn',logIn);

router.get('/:userName', getUser);

router.post('/setProfilePhoto', setProfilePhoto);

router.get('/getProfilePhoto', getProfilePhoto);

router.post('/addFollower', addFollower);



module.exports= router;