const express = require('express')
const router = express.Router()

const {loginUser, signupUser, verifyUser, verifyEmail} = require('../controllers/userController')

router.post('/login', verifyEmail, loginUser)

router.post('/signup', signupUser)

router.get('/verify-email', verifyUser)

module.exports = router