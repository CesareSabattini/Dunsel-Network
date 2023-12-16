const User= require('../models/User.js');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const { Post } = require('../models/Post.js');

const signIn = async (req, res)=>{
    try{
const salt= await bcrypt.genSalt();
const passwordHash= await bcrypt.hash(req.password, salt);


const user= new User({
    firstName: req.firstName,
    lastName: req.lastName,
    userName: req.userName,
    profilePhoto: '',
    password: passwordHash
})
const savedUser= await user.save().then(()=>console.log(user))
res.status(201).json(user);}
catch(err){
    console.log(err);
    res.status(500).json({error:err.message});
}
}

const logIn= async (req,res)=>{
    try{
        const {userName, password}= req.body;
        const user= await User.findOne({userName:userName});
        const posts= await Post.find({userName: userName});
        if(!user)return res.status(400).json({msg: 'User does not exist'});
        
        const isMatched= await bcrypt.compare(password, user.password);
        if(!isMatched)return res.status(400).json({msg: 'Invalid Password'});
        
        const token= jwt.sign({id:user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user, posts});
        
            }
            catch(err){
        res.status(500).json({error: err.message})
            }
        }

        const getUser= async (req, res)=>{
            try{
                const {userName}=req.params;
                const user=await User.find({userName: userName});
                const posts= await Post.find({userName: userName});
                res.status(200).json({user, posts});
            }
            catch(err){
res.status(200).json({});
            }

        }


    const setProfilePhoto= async (req, res)=>{
    try{
    const {userName, url}= req.body;
    const user= await User.findOneAndUpdate({userName: userName}, {profilePhoto: url}, {returnOriginal: true}).then((user)=>{
    });
    
    }
    catch(err){
        res.status(200).json({});
    }
        }
        
    const getProfilePhoto= async (req, res)=>{
        try{

        const {userName}= req.body;
        const user= await User.findOne({userName: userName}).then((response)=>{
            res.status(201).json(response.profilePhoto);
        })
    }
        catch(err){
            res.status(200).json({});
        }
    }
                

module.exports= {signIn, logIn, getUser, setProfilePhoto, getProfilePhoto};