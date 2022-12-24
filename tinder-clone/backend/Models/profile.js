const mongoose = require('mongoose')

const Schema = mongoose.Schema

const dbCard = new Schema({
    name:String,
    imgUrl:String
})

module.exports = mongoose.model('tinder-profiles',dbCard);