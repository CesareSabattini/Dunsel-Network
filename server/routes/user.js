const express= require('express');
const router= express.Router();
const {signIn, logIn, getUser}= require('../controllers/user')
const {verifyToken}= require('../middleware/auth')


router.post('/signIn',(req, res)=>{
    signIn(req.body, res);
    });

router.post('/logIn',logIn);

router.get('/:userName', getUser)



module.exports= router;