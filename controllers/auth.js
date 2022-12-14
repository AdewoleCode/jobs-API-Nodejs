const UserModel = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const bcrypt = require('bcryptjs')



const register = async (req, res) => {
    // const {name, password, email} = req.body

    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(password, salt)

    // const tempUser = {name, email, password:hashedPassword}
    const user = await UserModel.create({...req.body})

    

    const token = jwt.sign({userId: user._id, name: user.name}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})

    // const token = user.createJwt()

    res.status(StatusCodes.CREATED).json({user: {name: user.name}, token})
    // res.status(StatusCodes.CREATED).json({name: user.name, token})

}

const login= async (req, res) => {
    const {email, password} = req.body

    if (!email || !password){
        throw new BadRequestError('please provide email and password')
    }

    const user = await UserModel.findOne({email})

    if (!user){
        throw new UnauthenticatedError('invalid credentials')
    }
    
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch){
        throw new UnauthenticatedError('invalid credentials')
    }

    const token = jwt.sign({userId: user._id, name: user.name}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})


    res.status(StatusCodes.OK).json({user: {name: user.name}, token})
}


module.exports = {register, login}