const mongoose = require('mongoose')

const Student = new mongoose.Schema({
    name:{type:String},
    roll:{type:Number, unique:true}
})

module.exports = mongoose.model('attendance',Student)