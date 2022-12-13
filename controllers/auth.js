const UserModel = require('../models/User')
const { StatusCodes } = require('http-status-codes')


const register = async (req, res) => {
    // const {name, password, email} = req.body

    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(password, salt)

    // const tempUser = {name, email, password:hashedPassword}
    const user = await UserModel.create({...req.body})

    res.status(StatusCodes.CREATED).json({user})
}

const login= async (req, res) => {
    res.send('login')
}


module.exports = {register, login}