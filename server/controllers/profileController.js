const Profile = require("../models/profileModel");
const Post = require("../models/postModels");
const mongoose = require("mongoose");


const getProfile = async (req, res) => {
//   res.status(200).json({ msg: "get profile route" });
  const { id } = req.params;
  console.log(id)
  const profile = await Profile.findOne({ userId: id });
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No Profile with that id" });
  }
  if (!profile) {
    return res.status(404).json({ err: "Profile not found" });
  }
    res.status(200).json(profile);

};

//get one profile
// const getOneProfile = async (req, res) => {
//   const { username } = req.params;
  
//   // if (!mongoose.Types.ObjectId.isValid(id)) {
//   //   return res.status(404).json({ err: "No profile with that id" });
//   // }
//   console.log(username, 'id')
//   const profile = await Profile.findOne({ userName: username });
//   console.log(profile)

//   if (!profile) {
//     return res.status(404).json({ err: "profile not found" });
//   }
//   res.status(200).json(profile);
// }


const createProfile = async (req, res) => {
    // res.status(200).json({ msg: "post profile route" });
    // console.log(req.user)
    
    const {
      userName,
      profilePic,
      bio,
      coverPic,
      cloudinary_id,
      cloudinaryCov_id,
    } = req.body;
    // console.log(req.body)
    console.log(req.user)
    console.log(req.body)
    const {firstName, lastName, email} = req.user;
    const user_id = req.user._id;
    try{
        // console.log('jj')

        const profile = await Profile.create({
          userId: user_id,
          userName,
          firstName,
          lastName,
          profilePic,
          bio,
          coverPic,
          email,
          cloudinary_id,
          cloudinaryCov_id,
        });
        // console.log(profile)
        res.status(200).json({profile});

    } catch(err){
        res.status(400).json(err);
        console.log(err)
    }
}

const updateProfile = async (req, res) => {
    const { id } = req.params;
    console.log(req.body)

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ err: "No profile with that id" });
    }

    try {
      const profile = await Profile.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true }
      )

      const post = await Post.findOneAndUpdate({ userId: profile.userId }, { author: profile.userName }, { new: true });
      
      console.log(post, profile)

      if (!profile) {
        res.status(404).json({ err: "No profile with that id" });
      }
      res.status(200).json(profile);
    }catch(err) {
        res.status(400).json(err)
    }
};

const deleteProfile = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No profile with that id" });
  }
  const profile = await Profile.findOneAndDelete({ userId: id });

  if (!post) {
    return res.status(404).json({ err: "profile not found" });
  }
  res.status(200).json(profile);
};

const followCategory = async (req, res) => {
  // res.status(200).json({ msg: "follow category route" });
  const { id } = req.params;
  const { category } = req.body;
  console.log(category, req.params)
  try {

    const profile = await Profile.findOne({ userId: id })
    if(!profile.follow.includes(category)) profile.follow.push(category);
    await profile.save();
    console.log(profile)
    // profile.follow.push(category);
    // const updateProfile = await Profile.findByIdAndUpdate(profile._id, profile, {new: true})
    res.status(200).json(profile);
  }catch(err){
    console.log(err)
    res.status(400).json(err)
  }

  console.log(updateProfile)

}

const unFollowCategory = async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;
  console.log(category, req.params);
  const profile = await Profile.findOne({ userId: id }).select("follow");
  if (profile.follow.includes(category)) profile.follow.splice(profile.follow.indexOf(category), 1);
  await profile.save();
  const updateProfile = await Profile.findByIdAndUpdate(profile._id, profile, {
    new: true,
  });
  res.status(200).json(updateProfile);

  console.log(updateProfile);
};

module.exports = {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  followCategory,
  unFollowCategory
};