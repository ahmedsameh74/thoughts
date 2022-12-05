const express = require('express')
const {
  getAllFollowedPosts,
  createPost,
  getAllPosts,
  getOnePost,
  deletePost,
  updatePost,
  getWholePosts,
} = require("../controllers/postController");
const requireAuth = require('../middlewares/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/allposts', getWholePosts)

router.get('/:category', getAllFollowedPosts)

router.get('/', getAllPosts)

router.get('/:id', getOnePost)

router.post("/", createPost);

router.patch('/:id', updatePost)

router.delete('/:id', deletePost)

module.exports = router