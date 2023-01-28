import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  IconButton,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import "./App.css";
import { Stack } from "@mui/system";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [roll, setRoll] = useState(0);
  const [open, setOpen] = useState(false);
  const [open_1, setOpen_1] = useState(false);
  const [open_2, setOpen_2] = useState(false);
  const [open_3, setOpen_3] = useState(false);

  useEffect(() => {
    async function getStudent() {
      const req = await axios.get("http://localhost:2599/student/checkin");
      setData(req.data);
    }
    getStudent();
  });

  const checkIn = (req, res) => {
    let student = { name, roll };
    axios
      .post("http://localhost:2599/student/checkin", student)
      .then(() => setOpen(true))
      .catch(() => setOpen_2(true));
  };

  const checkOut = () => {
    axios
      .delete(`http://localhost:2599/student/checkin/${roll}`)
      .then(() => setOpen_1(true))
      .catch(() => setOpen_3(true));
  };

  return (
    <div>
      <Container sx={{ marginTop: "5cm" }}>
        <h1>Total Student Present: {data.length}</h1>
        <Stack direction="row" spacing={8}>
          <TextField
            variant="outlined"
            placeholder="Name"
            required
            label="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            placeholder="Roll Number"
            required
            label="Roll Number"
            value={roll}
            onChange={(e) => {
              setRoll(e.target.value);
            }}
          />
        </Stack>
        <Stack direction="row" spacing={8} sx={{ marginTop: "3rem" }}>
          <Button variant="contained" onClick={checkIn}>
            Check In
          </Button>
          <Button variant="contained" onClick={checkOut}>
            Check Out
          </Button>
        </Stack>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
        >
          <Alert severity="success">Attendance Recorded!!!</Alert>
        </Snackbar>
        <Snackbar
          open={open_1}
          onClose={() => {
            setOpen_1(false);
          }}
        >
          <Alert severity="info">Check Out successfull!!!</Alert>
        </Snackbar>
        <Snackbar
          open={open_2}
          autoHideDuration={2000}
          onClose={() => setOpen_2(false)}
        >
          <Alert severity="error">Roll Number is already Recorded</Alert>
        </Snackbar>
        <Snackbar
          open={open_3}
          onClose={() => {
            setOpen_3(false);
          }}
        >
          <Alert severity="error">
            Roll Number is not present to check out
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}

export default App;
