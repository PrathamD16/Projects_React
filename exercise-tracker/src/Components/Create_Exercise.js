import axios from "axios";
import React, { useEffect, useState } from "react";

function Create_Exercise() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    async function getUsers() {
      const res = await axios.get("http://localhost:5000/username/");
      setUsers(res.data);
    }
    getUsers();
  });

  return (
    <div>
      <div className="flex mt-3">
        <select
          value={username}
          className="rounded-lg flex-1 bg-blue-200 py-3 px-2 outline-none"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Select Username"
        >
          {users.map((x) => (
            <option
              selected
              className="ease-in-out"
              value={x.username}
            >
              {x.username}
            </option>
          ))}
        </select>
      </div>
      {/* <h3 className="">{username}</h3> */}
      <form className="space-y-5 my-[5cm]">
        <div></div>
        <div className="flex">
          <input className="flex-1 bg-blue-200 py-4 px-2 rounded-lg outline-none" type="text" placeholder="description" />
        </div>
      </form>
    </div>
  );
}

export default Create_Exercise;
