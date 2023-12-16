const {Post} =require( '../models/Post.js');

 const createPost= async (req, res)=>{
    try{
    const {userName, url, description}= req.body;
    
    const newPost= new Post({
        userName: userName,
        url: url,
        description,
        comments:[]
    })
    await newPost.save();
    const post= await Post.find({userName: userName});
    res.status(201).json(post);}
    catch(err){
        res.status(409).json({message: err.message})
    }
    
    }

    const getPosts= async (req,res)=>{
        try{
const {userName}= req.body;
const posts= await Post.find({userName: userName});
res.status(201).json(posts);
        }
        catch(err){
            res.status(409).json({message: err.message})
         }
    }

   
    module.exports= {createPost, getPosts};
