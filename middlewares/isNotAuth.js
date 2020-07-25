module.exports = (req, res, next) => {
    console.log(req.cookies)
    if(!req.cookies.token)
    next()
    else return res.json({
        errorName: "unauthorized",
        errorMsg: "already logged in!"

    })
}