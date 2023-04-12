const app = require('express')()
const cors = require('cors')
const { json } = require('express')
const mongoose = require('mongoose')
const username = require('./Routes/userRoute')
const exercise = require('./Routes/exerciseRoute')

require('dotenv').config()
app.use(json())
app.use(cors())

const port = process.env.PORT
const url = process.env.URL

app.use('/username',username)
app.use('/exercise',exercise)

mongoose.connect(url)
const connection = mongoose.connection
connection.once('open', () => {
    console.log(`Connected to database`)
})

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`)
})