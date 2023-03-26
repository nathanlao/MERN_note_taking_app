// Create a new express app
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const notesRoute = require('./routes/notesRoute')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT || 8080

// Connect to MongoDB cmpt372asn3 database
// const username = process.env.MONGOOSE_USER
// const password = process.env.MONGOOSE_PWD
// `mongodb+srv://${username}:${password}@cluster0.vmsvedd.mongodb.net/cmpt372asn3?retryWrites=true&w=majority`
mongoose.connect(
    'mongodb://mongodb:27017/my-notes-db', { useNewUrlParser: true, useUnifiedTopology: true }
)

// Check connection
const db = mongoose.connection
db.on('error', console.error.bind(console, "MongoDB connection error: "))
db.once('open', () => {
    console.log("MongoDB connected!")
})

app.use(cors())

app.use(express.static('public/build'))

// Parse incoming requests data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Logs incoming requests to console
app.use('/', (req, res, next) => {
    console.log(req.method, 'request: ', req.url, ' ', JSON.stringify(req.body))
    next()
})

app.use('/api', notesRoute)

// For any request that doesn't match one above, send back React's index.html file.
app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/build/index.html'))
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})