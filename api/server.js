const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true})
const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB connection established successfully')
})

const entryRouter = require('./routes/entries')
const userRouter = require('./routes/users')

app.use('/entries', entryRouter)
app.use('/users', userRouter)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
