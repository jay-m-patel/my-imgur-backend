const jwt = require('jsonwebtoken')
const User = require('./../models/User')

const auth = async (req, res, next) => {
    try {
        console.log(req.cookies, 'req.cookies')
        if(req.cookies.token) {
            const { userName } = jwt.verify(req.cookies.token, process.env.JWT_PRIVATE_KEY)
            const user = await User.findOne({userName})
            if(user.isLoggedIn) {
                req.user = user
                return next()
            }
        } 
        return res.json({
            errorName: "unauthenticated",
            errorMsg: "not logged in!"
        })
    

    } catch(err) {
        console.error(err, err.name, err.message)
        res.json({
            errorName: err.name,
            errorMsg: err.message,
            error: err
        })
    }
}

module.exports = auth