const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Exercise = require("../Schemas/exercise.model");

app.get('/',(req,res)=>{
    Exercise.find()
    .then(x => res.status(200).json(x))
    .catch(err => res.json(err))
})

app.get('/:id',(req,res)=>{
    Exercise.find()
    .then(x => res.status(200).json(x))
    .catch(err => res.json(err))
})

app.post('/add',(req,res)=>{
    const username = req.body.username
    const description = req.body.description
    const duration = Number(req.body.duration)
    const date = Date.parse(req.body.date)
    
    const newExercise = new Exercise({
        username,description,duration,date
    })

    newExercise.save()
    .then(() => res.status(200).json('Exercise added successfully'))
    .catch(() => res.json(err))
})

app.delete('/:id',async (req,res)=>{
    await Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise Deleted!'))
    .catch(err => res.json(err)) 
})


app.patch('/:id',getExercise,async (req,res)=>{
    if(req.body.description != null){
        res.exercise.description = req.body.description
    }
    if(req.body.duration != 0){
        res.exercise.duration = req.body.duration
    }
    
    try{
        await res.exercise.save()
        res.json('Exercise updated!!')
    }
    catch(err){
        res.json('Error: ' + err)
    }

})

//function to get exercise
async function getExercise(req,res,next){
    let exercise;
    try{
        exercise = await Exercise.findOne({_id:req.params.id})
    }
    catch(err){
        return res.status(500).json('Error on server side')
    }

    res.exercise = exercise
    next()
}

module.exports = app