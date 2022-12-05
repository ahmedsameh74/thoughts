const mongoose = require('mongoose');
const schema = mongoose.Schema;

const profileSchema = new schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    required: false,
  },
  coverPic: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  follow: {
    type: Array,
    unique: false,
    default: [],
    required: false,
  },
  cloudinaryCov_id: {
    type: String,
    required: true,
  },
  cloudinary_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Profile", profileSchema);