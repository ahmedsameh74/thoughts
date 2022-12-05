const Post = require("../models/postModels");
const Profile = require("../models/profileModel");
const mongoose = require("mongoose");

const getAllFollowedPosts = async (req, res) => {
    const {category} = req.params;
    const user_id = req.user._id;
    const posts = await Post.find({categories: category}).sort({ createdAt: -1 });
    res.status(200).json(posts);
}

const getWholePosts = async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
}

// GET all posts
const getAllPosts = async (req, res) => {
    const user_id = req.user._id;
    console.log(req)
    const posts = await Post.find({userId: user_id}).sort({ createdAt: -1 });
    console.log(posts)
    res.status(200).json(posts);
}

// GET one post
const getOnePost = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'No post with that id'})
    }

    const post = await Post.findOne({_id: id});
    
    if(!post){
        return res.status(404).json({err: "Post not found"});
    }

    res.status(200).json(post);


    
}

// POST a post
const createPost = async (req, res) => {
  const {
    title,
    body,
    photo,
    cloudinary_id,
    categories,
    color,
    background,
    fontSize,
  } = req.body;
  console.log(req.body)
  try {
    const user_id = req.user._id;
    const author = await Profile.findOne({ userId: user_id }).select('userName');
    // console.log(user_id);
    const post = await Post.create({
      author: author.userName,
      title,
      body,
      photo,
      cloudinary_id,
      categories: categories,
      userId: user_id,
      fontColor: color,
      backgroundColor: background,
      fontSize,
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(400).send(err);
  }
};

// PATCH a post
const updatePost = async (req, res) => {
    const {id} = req.params;
    const {userId} = req.user._id

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err: 'No post with that id'})
    }
    const postId = await Post.find({_id: id}).select('userId');
    console.log(postId.userId, id)
    if(postId.userId !== id){
        const post = await Post.findOneAndUpdate({_id: id}, {...req.body})
        console.log(post)
    
        if(!post){
            res.status(404).json({err: "No post with that id"})
        }
        res.status(200).json(post);

    }
    
}

// DELETE a post
const deletePost = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err: 'No post with that id'})
    }
    const post = await Post.findOneAndDelete({_id: id});

    if(!post){
        return res.status(404).json({err: "Post not found"});
    }
    res.status(200).json(post);
}

module.exports = {
  createPost,
  getAllPosts,
  getOnePost,
  deletePost,
  updatePost,
  getAllFollowedPosts,
  getWholePosts,
};