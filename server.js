// const dotenv = require('dotenv')
// dotenv.config()

require('./db')

const express = require('express')
const cors = require('cors')
const router = require('./routes')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(router)

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`server running on port ${port}`))