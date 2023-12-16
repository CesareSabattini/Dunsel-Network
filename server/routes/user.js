const express= require('express');
const router= express.Router();
const {signIn, logIn, getUser, setProfilePhoto, getProfilePhoto}= require('../controllers/user')
const {verifyToken}= require('../middleware/auth')


router.post('/signIn',(req, res)=>{
    signIn(req.body, res);
    });

router.post('/logIn',logIn);

router.get('/:userName', getUser);

router.post('/setProfilePhoto', setProfilePhoto);

router.get('/getProfilePhoto', getProfilePhoto);



module.exports= router;