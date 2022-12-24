const router = require("express").Router();
let User = require("../models/user.model"); //Importing our create 'user.model.schema'

//Endpoint which handles first get request
//If its '/' then it will load user.model
router.route("/").get((req, res) => {
  User.find() //method that will find and allt result will be returned in json format
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error " + err));
});

//by adding '/add' in url we will add the new userName
router.route("/add").post((req, res) => {
  const username = req.body.username; //This will take input from the user
  const newUser = new User({ username }); //we create newuser and add the created username into the schema its similar to props in reactjs same name

  newUser
    .save() //save is the method which will save the entered data into database
    .then(() => res.json("User Added")) //If successful then data will be added
    .catch((err) => res.status(400).json("Error " + err)); //Else it will show the error even for the dupllication of the data
});

module.exports = router;
