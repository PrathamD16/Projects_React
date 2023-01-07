const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const Profile = require('./Schema')
const port = process.env.PORT || 2599
const route = express.Router()

app.use(express.json())
app.use(cors())

require('dotenv').config()
const url = process.env.URL;

mongoose.connect(url)
mongoose.connection.once('open',()=>{
    console.log(`Connected to database successfully`)
})

app.get('/students/attendance',(req,res)=>{
    Profile.find()
    .then(profile => res.status(200).json(profile))
    .catch(err => res.status(400).json(err))
})

app.post('/students/attendance',(req,res)=>{
    const name = req.body.name
    const roll = Number(req.body.roll)
    const entry = new Date()

    const newDate = new Profile({
        name,roll,entry
    })

    newDate.save()
    .then(()=>res.status(200).json('Date Added'))
    .catch((err)=>res.status(400).json(err))
})

route.route('/students/attendance/:id').delete((req,res) => {
    Profile.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
})


app.listen(port , ()=>{
    console.log(`Listening on port ${port}`)
})