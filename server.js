const dotenv = require('dotenv')
dotenv.config()

require('./db')

const express = require('express')
const cors = require('cors')
const router = require('./routes')
const cookieParser = require('cookie-parser')

const app = express()

var whitelist = ['http://localhost:3000', 'https://my-imgur.netlify.app']
var corsOptions = {
    credentials: true,      // to allow cookies from front-end
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
        } else {
        callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions))
app.use(express.json())
// app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(router)

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`server running on port ${port}`))