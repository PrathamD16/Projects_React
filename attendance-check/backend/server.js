const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Profile = require('./Schema')
const app = express()


const port = process.env.PORT || 2599

app.use(express.json())
app.use(cors())


mongoose.connect('mongodb+srv://PrathamD16:PrathamD16@cluster0.6bgxuwg.mongodb.net/?retryWrites=true&w=majority')
mongoose.connection.once('open',()=>{
    console.log(`Connected to database`)
})

app.get('/student/checkin',(req,res)=>{
    Profile.find()
    .then(x => res.status(200).json(x))
    .catch(err => res.status(400).json(err))
})

app.delete('/student/checkin/:roll', getstudent, async (req,res)=>{

})

app.post('/student/checkin',(req,res)=>{
    const name = req.body.name
    const roll = Number(req.body.roll)
    const newStudent = new Profile({
        name,roll
    })
    newStudent.save()
    .then(()=>res.status(201).json('Success'))
    .catch(()=>res.status(400).json('Error'))
})


app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})


async function getstudent(req,res,next){
    let student;
    try {
        student = await Profile.find({roll:req.params.roll})
        if(student.length == 0){
            return res.status(404).json('Student not found')
        }

        await Profile.deleteOne({roll:req.params.roll})
        return res.status(201).json('Check out successfull')
    } catch (error) {
        return res.status(500).json('Error on server side')
    }
}