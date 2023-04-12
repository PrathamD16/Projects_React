const mongoose = require("mongoose");
const useSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    minlength: 3,
    trim: true,
    required: true,
  },
});

module.exports = mongoose.model("username", useSchema);
