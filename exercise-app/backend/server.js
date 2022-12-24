const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); //helps to connect to mongodb db

require("dotenv").config(); //Have environment variable in .env file

const app = express(); //creating 'express variable'
const port = process.env.PORT || 5000; //creating a port

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);  //we dont need useNewUrlParser and useCreateIndex as new MongoDb automatically sets this value
//so if we use only 'uri' from .env file then we can directly connect mongodb to our application
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("Connection established successfully");
})

const exercisesRouter = require('./routes/exercise')
const userRouter = require('./routes/user')

app.use('/exercises',exercisesRouter) //Now when in url part when there is '/exercise' then it will load all the contents from 'exercise' file
app.use('/users',userRouter)  //This will follow same as above bt it will load user.js file

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
