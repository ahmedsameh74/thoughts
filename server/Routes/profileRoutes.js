const express = require('express')
const {
  createProfile,
  getProfile,
  deleteProfile,
  updateProfile,
  getOneProfile,
  followCategory,
  unFollowCategory,
} = require("../controllers/profileController");
const requireAuth = require('../middlewares/requireAuth')

const route = express.Router()
route.use(requireAuth)

route.get("/user/:id", getProfile);
// route.get('/user/profile/:username', getOneProfile)

route.post("/user", createProfile);

route.patch("/user/:id", updateProfile);
route.delete("/user/:id", deleteProfile);
route.post('/follow/:id', followCategory)
route.post('/unfollow/:id', unFollowCategory)

module.exports = route