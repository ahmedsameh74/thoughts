const express = require('express')
const {
  getProfile,
  getBlogs,
  postComment,
  getComments,
  contactAuthor,
  getPostsByCategory,
  getAllCategories,
} = require("../controllers/publicController");
const {getAllPosts, getOnePost} = require('../controllers/postController')

const router = express.Router()

router.get('/profile/:username', getProfile);
router.get('/blogs/:author', getBlogs);
router.get('/:id/comments', getComments)
router.post('/:id/comments', postComment)
// router.get("/posts", getAllPosts);

router.get("/:id", getOnePost);
router.get('/:cats/category', getPostsByCategory)
router.get('/cat/all', getAllCategories)
router.post('/message/:username', contactAuthor)


module.exports = router