const Profile = require('../models/profileModel');
const Post = require("../models/postModels");
const nodeMailer = require('nodemailer');



const mongoose = require('mongoose');

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: "asameh1500@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});





const getProfile = async (req, res) => {
  const { username } = req.params;

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(404).json({ err: "No profile with that id" });
  // }
//   console.log('first')
//   console.log(username, "id");
  const profile = await Profile.findOne({ userName: username });
//   console.log(profile);

  if (!profile) {
    // console.log('err')
    return res.status(404).json({ err: "profile not found" });
    
  }
  res.status(200).json(profile);
};

const getBlogs = async (req, res) => {
  const {author} = req.params;
  // console.log(username, 'username')
  const posts = await Post.find({author: author});
  if(!posts){
    return res.status(404).json({err: 'No posts found'})
  }
  res.status(200).json(posts)


};

const getComments = async (req, res) => {
  res.status(200).json({msg: 'get comments'})
}

const postComment = async (req, res) => {
  // res.status(200).json({msg: 'post comment'})
  const {id } = req.params;
  const {email,comment} = req.body;
  console.log(email, comment)
  try {

    const post = await Post.findById(id);
    if(!post){
      return res.status(404).json({err: 'No post found'})
    }
    // post.comments.email(email);
    // post.comments.text(comment);
    // post.comments.email({email})
    // post.comments.text({comment})
    console.log(post)
    // post.comments.email += email;
    // post.comments.text += comment;
    // post.comments.email.push(email);
    // post.comments.text.push(comment);
    post.comments.push({email, text: comment})
    console.log(post)
    await post.save();
    const updatedPost = await Post.findByIdAndUpdate(id, post, {new: true});
    res.status(200).json(updatedPost)
    console.log(updatedPost)
  }catch(err){
    console.log(err)
  }
  
}

const contactAuthor = async (req, res) => {
  const {username} = req.params
  const {email, subject} = req.body;
  // console.log(username, email, subject)
  const user = await Profile.findOne({userName: username})
  // console.log(user.email)
  // res.status(200).json({msg: 'contact author'})
  try{
    const mailOptions = {
      from: email,
      to: user.email,
      subject: 'new message from your blog',
      text: `this message from ${email}
      ${subject}`
    }
    transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
  }catch(err){
    res.status(400).json(err)
  }
}

const getPostsByCategory = async (req, res) => {
  const {cats} = req.params;
  const posts = await Post.find({ categories: cats });
  // console.log(posts);
  if (!posts) {
    return res.status(404).json({ err: "No posts found" });
  }
  res.status(200).json(posts)
}

const getAllCategories = async (req, res) => {
  // res.status(200).json({msg: 'get all categories'})
  try {

    const posts = await Post.find();
    const cats = posts.map((post) => post.categories);
    
    const uniqueCats = [...new Set(cats.flat())];
    
    // console.log(postsunique)
    
    // console.log([...new Set(cats)]);
    // console.log(posts)
    res.status(200).json([...uniqueCats]);
  }catch(err){
    res.status(400).json(err)
  }
}

module.exports = {
  getProfile,
  getBlogs,
  getComments,
  postComment,
  contactAuthor,
  getPostsByCategory,
  getAllCategories,
};