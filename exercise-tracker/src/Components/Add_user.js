import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Add_user() {
  const [name, setName] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate()

  const submitHandler = () => {
    const new_user = {
      fname: name,
      lname: lname,
      username: username,
    };

    // console.log(USER_REGEX.test(username));

    if (USER_REGEX.test(username)) {
      console.log("Valid")
      axios.post('http://localhost:5000/username/add',new_user)
      .then(() => console.log(new_user))
      .catch(() => console.log('Username already exists'))
      setName("")
      setLname("")
      setUsername("")
      navigate('/')
    }
    else{
      console.log("Invalid User Name")
    }
  };

  return (
    <form className="items-center space-y-10 font-sans">
      <div></div>
      <div className="my-4 flex">
        <input
          autoComplete="disabled"
          className="bg-slate-300 flex-1 py-3 px-3 active:border-none"
          value={name}
          placeholder="First Name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="my-4 flex">
        <input
          autoComplete="disabled"
          className="bg-slate-300 flex-1 py-3 px-3 active:border-none"
          value={lname}
          placeholder="Last Name"
          onChange={(e) => setLname(e.target.value)}
        />
      </div>
      <div className="my-4 flex">
        <input
          autoComplete="disabled"
          className="bg-slate-300 flex-1 py-3 px-3 active:border-none"
          value={username}
          placeholder="UserName"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-400 px-10 py-3 rounded-md flex-1 hover:bg-blue-800 transition ease-linear font-bold hover:text-white "
          onClick={submitHandler}
        >
          Add+
        </button>
      </div>
    </form>
  );
}

export default Add_user;
