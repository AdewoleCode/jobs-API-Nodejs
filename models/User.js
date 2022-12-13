const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide name'],
        maxlength: 40,
        minlength: 4,
    },
    email: {
        type: String,
        required: [true, 'please provide name'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
             'please provide a valid email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please provide password'],
        minlength: 5,
    }
})

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password =await bcrypt.hash(this.password, salt)
    next()
})

// userSchema.methods.createJwt = function () {
//     return jwt.sign({userId:this._id, name:this.name}, 'jwtSecret', {expiresIn: '30d'})
// }

module.exports = mongoose.model('User', userSchema)