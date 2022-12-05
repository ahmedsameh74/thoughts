const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const validator = require('validator')
const crypto = require('crypto')

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    emailToken: {
        type: String
    },
    isVerified: {
        type: Boolean
    }
})

userSchema.statics.signup = async function(firstName, lastName, email, password) {
    if(!email || !password || !firstName || !lastName) {
        throw new Error('Please provide all fields')
    }
    if(!validator.isEmail(email)) {
        throw new Error('Please provide a valid email')
    }
    if(!validator.isStrongPassword(password)) {
        throw new Error('Please provide a strong password')
    }
    const exists = await this.findOne({email})
    if(exists) {
        throw new Error('Email already exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({firstName, lastName, email, password: hash, isVerified: false, emailToken: crypto.randomBytes(64).toString('hex')})
    
    return user

}
userSchema.statics.login = async function(email, password) {
    if(!email || !password) {
        throw new Error('Please provide all fields')
    }
    const user = await this.findOne({email})
    if(!user) {
        throw new Error('Email does not exist')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw new Error('Password is incorrect')
    }
    return user
}

module.exports = mongoose.model('User', userSchema);