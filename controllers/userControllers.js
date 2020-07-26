const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./../models/User')
const Post = require('./../models/Post')

const cookieOptions = {httpOnly: true, secure: false}   // set secure:false after deploying front-end

const errorName = 'errorName'
const errorMsg = 'errorMsg'


module.exports.dashboard = async (req, res) => {

    try {
        const checkToken = async req => {
            if(req.cookies.token) {
                const { userName } = jwt.verify(req.cookies.token, process.env.JWT_PRIVATE_KEY)
                const user = await User.findOne({userName})
                return user
            } else return null
        }
    
        const user = await checkToken(req)

        const posts = await Post.find().sort({ _id: -1 }).limit(20)
    
        res.json({
            user: user,
            posts: posts
        })
    
    } catch(err) {
        console.error(err, err.name, err.message)
        res.json({
            [errorName]: err.name,
            [errorMsg]: err.message,
            error: err
        })
    }
}


module.exports.register = async (req, res) => {
    
    try {
        const {userName, password, fullName} = req.body
        const hash = await bcryptjs.hash(password, 10)
        const token = jwt.sign({userName: userName}, process.env.JWT_PRIVATE_KEY)
        
        const user = new User({
            userName: userName,
            password: hash,
            fullName: fullName,
            isLoggedIn: true
        })
        const savedUser = await user.save()

        savedUser.password = undefined
        // delete savedUser.password

        res.cookie('token', token, cookieOptions)
        res.json({
            user: savedUser
        })

    } catch(err) {
        console.error(err, err.name, err.message)
        res.json({
            [errorName]: err.name,
            [errorMsg]: err.message,
            error: err
        })
    }
}


module.exports.login = async (req, res) => {
    
    try {
        const {userName, password} = req.body
        const user = await User.findOneAndUpdate({userName}, {isLoggedIn: true}, {new: true})
        
        if(user === null) return res.json({
            [errorName]: "unauthenticated",
            [errorMsg]: "invalid userName/password"
        })

        if(! await bcryptjs.compare(password, user.password)) return res.json({
            [errorName]: "unauthenticated",
            [errorMsg]: "invalid userName/password"
        })
        else {
            user.password = undefined
            // const d = delete user.password

            const token = jwt.sign({userName: userName}, process.env.JWT_PRIVATE_KEY)

            res.cookie('token', token, cookieOptions)
            res.json({
                user: user
            })            
        }

    } catch(err) {
        console.error(err, err.name, err.message)
        res.json({
            [errorName]: err.name,
            [errorMsg]: err.message,
            error: err
        })
    }
}


module.exports.logout = async (req, res) => {
    try {
        req.user.isLoggedIn = false
        const savedUser = await req.user.save()
        res.clearCookie('token')
        res.json({
            loggedOutUser: savedUser.userName,
            isLoggedOut: true
        })
    } catch(err) {
        console.error(err, err.name, err.message)
        res.json({
            [errorName]: err.name,
            [errorMsg]: err.message,
            error: err
        })
    }
}