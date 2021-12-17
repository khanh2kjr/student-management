const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8000
const cors = require('cors')
const expressFileUpload = require('express-fileupload')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressFileUpload())

app.get('/', (_, res) => {
  res.json({ message: '' })
})

require('./routes/student.routes.js')(app, '/api/students')

app.listen(PORT)
