const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const cors = require('cors')
const app = express()
const port = 3001

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(cors())

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/entries', db.getEntries)
app.post('/entries', db.createEntry)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

