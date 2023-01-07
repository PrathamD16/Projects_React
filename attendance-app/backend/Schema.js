const mongoose = require('mongoose')

const Attendance = mongoose.Schema

const Data = new Attendance({
    name:{type:String},
    roll:{type:Number, unique:true},
    entry:{type:Date}
})

module.exports = mongoose.model('attendance',Data)