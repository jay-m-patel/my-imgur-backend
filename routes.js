const express = require('express')
const router = express.Router()

const auth = require('./middlewares/auth')
const { register } = require('./controllers/userControllers')

router.get('/', auth)

router.post('/register', register)

module.exports = router