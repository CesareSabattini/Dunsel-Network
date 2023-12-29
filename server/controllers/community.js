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
        const user= await User.findOneAndUpdate({userName: req.body.userName}, {$push:{communities:newCommunity}}, {returnOriginal: true}).then((user)=>{
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
const user= await Community.find({userName:userName}).then((response)=>{
    res.status(201).json(response);
});}
catch(err){
        res.status(401).json({});
}

}




const getCommunity= async (req, res)=>{
    try{
        console.log(req.params)
        const {communityName}=req.params;
        const community=await Community.findOne({communityName: communityName});
        
        res.status(200).json({community});
    }
    catch(err){
res.status(200).json({});
    }

}


const addToCommunity= async (req, res)=>{
    try{
        console.log(req.params)

const {userName, communityName}= req.params;

const community=await Community.findOneAndUpdate({communityName: communityName}, {$push:{members: userName}}, {returnOriginal: true}).then((response)=>res.status(201).json(response));
}
catch(err){
    res.status(200).json({});
}
}

const leaveCommunity= async (req, res)=>{
    try{
        console.log(req.params)

const {userName, communityName}= req.params;

const community=await Community.findOneAndUpdate({communityName: communityName}, {$pull:{members: userName}},  { safe: true, multi: false }).then((response)=>res.status(200).json({ message: "Album Deleted Successfully" }));
}
catch(err){
    res.status(209).json({});
}
}


const addPost= async (req, res)=>{
    try{
        console.log(req.body)
        const {communityName, post}= req.body;
        
        const community=await Community.findOneAndUpdate({communityName: communityName}, {$push:{posts: post}}, {returnOriginal: true}).then((response)=>{
            console.log(response)
            res.status(201).json(response)});
        
        }
        catch(err){
            res.status(200).json({});
        }
}

const postComment= async (req, res)=>{
    try{
const {userName, post, communityName,text}=req.body;
const newComment={
userName: userName,
text:text
}
post.comments.push(newComment);
const pullOperation=await Community.findOneAndUpdate({communityName:communityName}, {$pull:{posts: {url: post.url, userName: post.userName, description: post.description}}},  { safe: true, multi: false } ).then(()=>{console.log('post pulled')})
const pushOperation=await Community.findOneAndUpdate({communityName: communityName}, {$push:{posts: post}}, {returnOriginal: true}).then((response)=>{
    console.log(response)
    res.status(201).json(response)});

        console.log(req.body)
    }
    catch(err){
        res.status(200).json({});
    }
}

module.exports= {createCommunity, getCommunities, getCommunity, addToCommunity, addPost, leaveCommunity, postComment };