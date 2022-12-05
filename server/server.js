require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const cloudinary = require('./cloudinary')
const Post = require('./models/postModels')

// const fileupload = require('express-fileupload')
// const Profile = require('./models/profileModel')
// const {getOneProfile }= require('../controllers/profileController')


const postRoutes = require('./Routes/postRoutes')
const userRoutes = require('./Routes/userRoutes')
const profileRoutes = require('./Routes/profileRoutes')
const publicRoutes = require('./Routes/publicRoutes')

const app = express()


app.use(express.json())

// app.use("/images", express.static(path.join(__dirname, "/images")));
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)
app.use('/api/profiles', profileRoutes)
app.use('/api/user', publicRoutes);
app.use('/api/pposts', publicRoutes);
app.use('/api/comments', publicRoutes)
app.use('/api/contact', publicRoutes)
app.use('/api/user', profileRoutes)
app.use('/api/user', profileRoutes)
app.use('/api/cat', publicRoutes)
app.use('/api/cats', publicRoutes)

mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('server is connected to db and running on port ', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    });

const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     cb(null, 'images')
    // },
    // filename: (req, file, cb) => {
    //     cb(null, req.body.name);
    // }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // let ext = path.extname(file.originalname)
        // console.log(ext)
        // if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        //     return cb(new Error('only png, jpg, jpeg are allowed'), false)
        // }
        cb(null, true)
    }
})
app.post('/api/uploads/blogsheader', upload.single('file'),async (req, res, next) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        
        res.status(200).json(result)
        next()
    } catch(err) {
        console.log(err)
    }
})
app.post('/api/uploads/profilephoto', upload.single('file'),async (req, res, next) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        
        res.status(200).json(result)
        next()
    } catch(err) {
        console.log(err)
    }
})
app.post('/api/uploads/coverphoto', upload.single('file'),async (req, res, next) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        
        res.status(200).json(result)
        next()
    } catch(err) {
        console.log(err)
    }
})
