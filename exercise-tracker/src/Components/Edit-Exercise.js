import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


export default function Edit_Exercise() {
  var exercise = {}
  const [des, setDes] = useState(exercise.description)
  const [dur, setDur] = useState(exercise.duration)
  const {id} = useParams()

  const REF = useNavigate()

  useEffect(() => {
    exercise = axios.get(`http://localhost:5000/exercise/${id}`)
  })

  const submitHandler = () => {
    const Exercise = {
      description:des,
      duration:dur
    }

    axios.patch(`http://localhost:5000/exercise/${id}`,Exercise)
    .then(() => console.log('Updated'))
    
    REF('/')
    // window.location('http://localhost:3000/')

  }

  const deleteExercise = () => {
    axios.delete(`http://localhost:5000/exercise/${id}`)
    .then(() => console.log('Exercise Deleted'))

    REF('/')
    // window.location('http://localhost:3000/')
  }

  return (
    <div>
        <p>{id}</p>
        <p>Edit Page</p>
        <input value={des} onChange={(e) => setDes(e.target.value)} placeholder='Description' defaultValue={des} />
        <input value={dur} onChange={(e) => setDur(e.target.value)} placeholder='Duration' defaultValue={dur}  />
        <button onClick={submitHandler}>Submit</button>
        <button onClick={deleteExercise}>Delete Exercise</button>
    </div>
  )
}
