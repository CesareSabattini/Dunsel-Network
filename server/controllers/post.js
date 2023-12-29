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
const {userName}= req.params;
const posts= await Post.find({userName: userName});
res.status(201).json(posts);
        }
        catch(err){
            res.status(409).json({message: err.message})
         }
    }

    const deletePost= async (req, res)=>{
        try{
const {userName, postId}= req.params;
console.log(req.body)
await Post.deleteOne({userName: userName, _id: postId}).then((response)=>{
    console.log('Post deleted')
    res.status(200).json(response)
})
        }
        catch(err){
            res.status(409).json({message: err.message})
        }
    }

   
    module.exports= {createPost, getPosts, deletePost};
