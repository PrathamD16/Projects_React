const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 5000
const dbCard = require('./Models/profile')
const cors = require('cors')


const url = 'mongodb+srv://PrathamD16:PrathamD16@cluster0.6bgxuwg.mongodb.net/?retryWrites=true&w=majority'
app.use(cors())
app.use(express.json())


mongoose.connect(url)
const Connection = mongoose.connection
Connection.once('open',()=>{
    console.log("Connected to database successfully")
})


app.post('/tinder/cards',(req,res)=>{
    const name = req.body.name
    const imgUrl = req.body.imgUrl
    const newProfile = new dbCard({
        name,imgUrl
    })

    newProfile.save()
    .then(()=>res.status(200).json(newProfile))
    .catch(()=>res.status(404).json(err))
})

app.get('/tinder/cards',(req,res)=>{
    dbCard.find()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).json(err))
})

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`)
})
