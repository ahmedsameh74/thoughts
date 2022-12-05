const User = require('../models/userModel')
const Profile = require('../models/profileModel')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

//create token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

//mail verification
const mailVerifiction = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "asameh1500@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      const profile = await Profile.findOne({userId: user._id})
      res.status(200).json({ firstName: user.firstName, email: user.email, id: user._id, token, profile: profile ? profile : null });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
}

//signup user
const signupUser = async (req, res) => {
    const {firstName, lastName, email, password} = req.body
     try {
        const user = await User.signup(firstName, lastName, email, password)
        const token = createToken(user._id)
        res.status(200).json({user, token})

        const mailOption = {
            from: 'Thoughts',
            to: email,
            subject: 'Email Verification',
            html: `<h1>Thank you for signing up with Thoughts</h1>
            <p>Please click on the link below to verify your email</p>
            <a href="http://localhost:8000/api/users/verify-email?token=${user.emailToken}">Verify Email</a>`
        }
        mailVerifiction.sendMail(mailOption, (err, info) => {
            if(err) {
                console.log(err, 'err')
            } else {
                console.log(info, 'info')
            }
        })

     }catch(err) {
            res.status(404).json({message: err.message}) 
            console.log(err.message)
     }
}

//verify user
const verifyUser = async (req, res) => {
  try {
    const token = req.query.token;
    const user = await User.findOne({ emailToken: token });
    if(user) {
        user.emailToken = null;
        user.isVerified = true;
        await user.save();
        console.log('email verified')
        res.status(200).json({message: 'email verified'})
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const verifyEmail = async (req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email})
        if(user.isVerified){
            next()
        }else{
            throw new Error('Please verify your email')
        }
    }catch(err){
        res.status(404).json({message: err.message})
    }
}

module.exports = {loginUser, signupUser, verifyUser, verifyEmail}