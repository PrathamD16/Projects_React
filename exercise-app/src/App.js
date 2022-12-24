import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Navbar from "./Components/navbar.component"

import ExercisesList from "./Components/exercises-list.component";
import EditExercise from "./Components/edit-list.component";
import CreateExercise from "./Components/create-exercise.component";
import CreateUser from "./Components/create-user.component";


function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Routes>
        <Route path='/' element={<ExercisesList />} />
      </Routes>
      <Routes>
        <Route path='/edit/:id' element={<EditExercise />}/>
      </Routes>
      <Routes>
        <Route path='/user' element={<CreateUser />} />
      </Routes>
      <Routes>
        <Route path='/create' element={<CreateExercise />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;