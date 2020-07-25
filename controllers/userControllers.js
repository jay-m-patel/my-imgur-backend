const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./../models/User')

const cookieOptions = {}

module.exports.register = async (req, res) => {
    
    try {
        console.log(req.cookies, 'req.cookies')
        const {userName, password, fullName} = req.body
        const hash = await bcryptjs.hash(password, 10)
        const token = jwt.sign({userName: userName}, process.env.JWT_PRIVATE_KEY)

        
        const user = new User({
            userName: userName,
            password: hash,
            fullName: fullName
        })
        const savedUser = await user.save()
        
        res.cookie('token', token, cookieOptions)
        res.json({
            registeredSuccessfully: true,
            isLoggedIn: true,
            user: savedUser
        })

    } catch(err) {
        console.error(err, err.name)
        res.json({
            errorName: err.name,
            errorMsg: err.message,
            error: err
        })
    }
}