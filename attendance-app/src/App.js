import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Stack,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import "./App.css";

export default function App() {
  const date = 0;
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]); //For getting data from Db
  const [name, setName] = useState("");
  const [roll, setRoll] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const req = await axios.get("http://localhost:2599/students/attendance");
      setData(req.data);
    }

    fetchData();
  });

  function checkOut(id){
    setData()
  }

  const submitHandler = () => {
    date = new Date();
    setOpen(true);

    const newEntry = { name, roll, date };
    axios
      .post("http://localhost:2599/students/attendance", newEntry)
      .then(() => console.log('Success'))
      .catch(() => console.log('Error'));
  };

  return (
    <div>
      <Stack spacing={4} sx={{ alignItems: "center", marginTop: 30 }}>
        <h1>Attendance Of Students</h1>
        <Typography variant="h5">
          Students present in class {data.length}
        </Typography>
        <Stack spacing={4} direction="row">
          <TextField
            variant="outlined"
            placeholder="Enter your name"
            label="Name"
            helperText="Eg: ABC"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            placeholder="Enter your roll number"
            label="Roll Number"
            helperText="Eg: 31164"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            defaultValue={31}
          />
        </Stack>
        <Stack spacing={4} direction='row'>
        <Button variant="contained" onClick={submitHandler}>
          Check In
        </Button>
        <Button variant="contained" onClick={checkOut}>
          Check Out
        </Button>
        </Stack>
        <Snackbar open={open} onClose={() => setOpen(false)}>
          <Alert
            onClose={() => setOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Your attendance is saved successfully
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}
