const auth = (req, res, next) => {

    res.json({
        current: 'auth'
    })
}

module.exports = auth