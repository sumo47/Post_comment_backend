const express = require('express')
const app = express()
const mongoose = require('mongoose')
const route = require('./routes/route')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.set("strictQuery", true)
mongoose.connect('mongodb+srv://TusharJainFunctionup:functionup@tusharjaindb.zxey2fj.mongodb.net/PostApp')
    .then(() => console.log("Db connected successfully"))
    .catch((err) => console.log(err))

app.use('/', route)

let port = process.env.PORT || 3001;

app.listen(port, () => { console.log(`Port is running on ${port}`) })