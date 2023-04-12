const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserName = require("../Schemas/username.model");

app.get("/", (req, res) => {
  UserName.find()
    .then((x) => res.status(201).json(x))
    .catch((err) => res.status(400).json(err));
});

app.post("/add", (req, res) => {
  const fname = req.body.fname
  const lname = req.body.lname
  const username = req.body.username;
  const newUser = new UserName({
    fname,
    lname,
    username,
  });
  newUser
    .save()
    .then(() => res.status(200).json("New User Added"))
    .catch(() => res.status(205).json("Username already exists"));
});

app.delete("/:username", async (req, res) => {
  await UserName.findOneAndDelete({username:req.params.username})
  .then(() => res.json('Username Deleted Successfully'))
  .catch(err => res.json('Error: ' + err))
});

module.exports = app;
