const User= require('../models/User.js');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const sendVerificationEmail = require('../utils/emailVerification.js');
const { Post } = require('../models/Post.js');
var path = require('path');

const signIn = async (req, res)=>{
    try{
const salt= await bcrypt.genSalt();
const passwordHash= await bcrypt.hash(req.password, salt);


const user= new User({
    firstName: req.firstName,
    lastName: req.lastName,
    email: req.email,
    userName: req.userName,
    profilePhoto: '',
    password: passwordHash,
    isValid:false,
    followers:[],
    followed:[],
    communities:[]
})
const savedUser= await user.save().then(()=>console.log(user))
const verificationLink = `https://dunsel-network-server.vercel.app/user/verify/${req.userName}`;
sendVerificationEmail(req.email, verificationLink);
res.status(200).json(`Verification email has been sent to ${req.email}`)
}
catch(err){
    console.log(err);
    res.status(500).json({error:err.message});
}
}


const validateUser= async (req, res)=>{
    try{
const {userName}=req.params;
const user= await User.findOneAndUpdate({userName: userName}, {isValid: true}, {returnOriginal: true}).then((response)=>{
    res.sendFile('success.html', { root: path.join(__dirname, '../utils') })
});
}
catch(err){
    console.log(err);
}
}


const logIn= async (req,res)=>{
    try{
        console.log(req);
        const {userName, password}= req.body;
        const user= await User.findOne({userName:userName});
        const posts= await Post.find({userName: userName});
        if(!user)return res.status(400).json({msg: 'User does not exist'});
        
        if(user.isValid===true){
        const isMatched= await bcrypt.compare(password, user.password);
        if(!isMatched)return res.status(400).json({msg: 'Invalid Password'});
        
        const token= jwt.sign({id:user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user, posts});
        }
        else{
            res.status(500).json('Please, verify your account first');
        }
            }
            catch(err){
        res.status(500).json({error: err.message})
            }
        }

        const getUser= async (req, res)=>{
            try{
                const {userName}=req.params;
                const user=await User.find({userName: userName});
                res.status(200).json({user});
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
                

    const addFollowed= async (req, res)=>{
try{
const {userName, followedName}= req.body;

const follower= await User.findOne({userName: userName});
const followed= await User.findOne({userName: followedName});

if(follower.followed.includes(followed.userName)){
    console.log(followed.userName);
    return res.status(201).json('Already following');
}
else{


const followerUser=await User.findOneAndUpdate({userName: userName}, {$push:{followed: followedName}}, {returnOriginal: true}).then((followerUser)=>console.log(followerUser));
const followedUser= await User.findOneAndUpdate({userName: followedName}, {$push:{followers: userName}}, {returnOriginal: true}).then((followedUser)=>{
    
    
    res.status(201).json(response);
});


}}
catch(err){
    res.status(200).json({});

}
    }

    

    

const updateDescription= (req, res)=>{
    try{
    const {userName, description}= req.body;
    User.findOneAndUpdate({userName: userName}, {description: description}, {returnOriginal: true}).then((response)=>{
        res.status(201).json(response);
    });
}
catch(err){
    res.status(200).json({});
}
}

module.exports= {signIn, validateUser, logIn, getUser, setProfilePhoto, getProfilePhoto, addFollowed, updateDescription};