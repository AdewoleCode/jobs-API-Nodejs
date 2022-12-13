const UserModel = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')


const register = async (req, res) => {
    // const {name, password, email} = req.body

    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(password, salt)

    // const tempUser = {name, email, password:hashedPassword}
    const user = await UserModel.create({...req.body})

    

    const token = jwt.sign({userId: user._id, name: user.name}, 'jwtSecret', {expiresIn: '30d'})

    // const token = user.createJwt()

    res.status(StatusCodes.CREATED).json({user: {name: user.name}, token})
    // res.status(StatusCodes.CREATED).json({name: user.name, token})

}

const login= async (req, res) => {
    res.send('login')
}


module.exports = {register, login}