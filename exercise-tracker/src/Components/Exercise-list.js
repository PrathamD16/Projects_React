import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Exercise = (username,description,duration,date,_id) => (
    <tr>
      <td>{username}</td>
      <td>{description}</td>
      <td>{duration}</td>
      <td>{date.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+_id}>edit</Link>
      </td>
    </tr>
)

function Exercise_list() {

    useEffect(() => {
        async function fetchData(){
            const res = await axios.get('http://localhost:5000/exercise/')
            setExercise(res.data)
        }
        fetchData()
    })

    const [exercise, setExercise] = useState([])
  return (
    <div>
        {
            exercise.map(x => {
                return(
                    <>
                      {Exercise(x.username,x.description,x.duration,x.date,x._id)}  
                      Hrllo
                    </>
                )
            })
        }
    </div>
  )
}

export default Exercise_list