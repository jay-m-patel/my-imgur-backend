const express = require('express')
const router = express.Router()

const isAuth = require('./middlewares/isAuth')
const isNotAuth = require('./middlewares/isNotAuth')
const { register, login, logout } = require('./controllers/userControllers')

router.get('/', isAuth)

router.post('/register', isNotAuth, register)

router.post('/login', isNotAuth, login)

router.delete('/logout', isAuth, logout)

module.exports = router