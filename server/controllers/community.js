const {Community}= require('../models/Community.js');
const User= require('../models/User.js');


const createCommunity= async (req, res)=>{
    try{
        const newCommunity= new Community({
            communityName: req.body.communityName,
            communityTheme:req.body.communityTheme,
            communityDescription: req.body.communityDescription,
            members: [],
            posts: []
        });

        const savedCommunity= await newCommunity.save().then(()=>console.log(newCommunity))
        const user= await User.findOneAndUpdate({userName: req.body.userName}, {communities: communities.push(newCommunity)}, {returnOriginal: true}).then((user)=>{
        })
        res.status(201).json(newCommunity);

    }
        catch(err){
            console.log(err);
            res.status(500).json({error:err.message});
        }
}

const getCommunities= async (req, res)=>{
    try{
const userName= req.body.userName;
const user= await User.findOne({userName:userName}).then((response)=>{
    res.status(201).json(response);
});}
catch(err){
        res.status(200).json({});
}

}

const getCommunity= async (req, res)=>{
    try{
    const communityName= req.body.communityName;
    const community=Community.findOne({communityName:communityName}).then((response)=>{
        res.status(201).json(response);
    });
}
catch(err){
    res.status(200).json({});
}

}

const addToCommunity= async (req, res)=>{
    try{
const {userName, communityName}= req.body;
Community.findOneAndUpdate({communityName: communityName}, {communities: members.push(userName)}, {returnOriginal: true})
}
catch(err){
    res.status(200).json({});
}
}

const addPost= async (req, res)=>{
    try{
        const {communityName, post}= req.body;
        Community.findOneAndUpdate({communityName: communityName}, {posts: posts.push(post)}, {returnOriginal: true}).then((response)=>{
            res.status(201).json(response);
        })
        }
        catch(err){
            res.status(200).json({});
        }
}

module.exports= {createCommunity, getCommunities, getCommunity, addToCommunity, addPost };