const express= require('express');
const router= express.Router();
const {signIn, logIn}= require('../controllers/user')

router.post('/signIn',(req, res)=>{
    signIn(req.body, res);
    });

router.post('/logIn',logIn);




module.exports= router;