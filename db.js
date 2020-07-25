const mongoose = require('mongoose')
const dbName = 'imgurDB'
const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.oo9ce.mongodb.net/${dbName}?retryWrites=true&w=majority`


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log("Database connected"))
.catch(err => console.log(err))