const mongoose = require('mongoose')
const schema = mongoose.Schema
const Comment = require('./commentModel')

const commentSchema = new schema({
  email: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const postSchema = new schema(
  {
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    body: {
      type: String,
      required: true,
    },
    comments: [
      {
        email: {
          type: String,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],

    photo: {
      type: String,
      required: true,
    },
    cloudinary_id: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
    userId: {
      type: String,
      required: true,
    },
    fontSize: {
      type: String,
      required: true
    },
    fontColor: {
      type: String,
      required: true
    },
    backgroundColor: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema)