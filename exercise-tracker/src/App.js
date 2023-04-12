import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Edit_Exercise from './Components/Edit-Exercise'
import Exercise_list from './Components/Exercise-list'
import Navbar from './Components/Navbar'
import Create_Exercise from './Components/Create_Exercise'
import Add_user from './Components/Add_user'

function App() {
  return (
    <div className='my-1 mx-5 flex-grow'>
      {/* <Edit_Exercise /> */}
      <Navbar />
      <Routes>
        <Route path='/edit/:id' element={<Edit_Exercise />}/>
      </Routes>
      <Routes>
        <Route path='/create' element={<Create_Exercise />}/>
      </Routes>
      <Routes>
        <Route path='/adduser' element={<Add_user />}/>
      </Routes>
      <Routes>
        <Route path='/' element={<Exercise_list />}/>
      </Routes>
    </div>
  )
}

export default App