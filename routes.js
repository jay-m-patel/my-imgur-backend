const express = require('express')
const router = express.Router()

const multer = require('./middlewares/multer')

const isAuth = require('./middlewares/isAuth')
const isNotAuth = require('./middlewares/isNotAuth')
const { register, login, logout, dashboard } = require('./controllers/userControllers')
const { newPost } = require('./controllers/appControllers')

router.get('/', dashboard)

router.post('/register', isNotAuth, register)

router.post('/login', isNotAuth, login)

router.delete('/logout', isAuth, logout)

router.post('/newpost', multer.array('upload'), isAuth, newPost)

module.exports = router