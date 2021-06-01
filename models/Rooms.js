const mongoose = require('mongoose')
const moment = require('moment')

mongoose.connect("mongodb+srv://admin:NCAV0l5a8wVYTFZW@cluster0.craiv.mongodb.net/rooms?retryWrites=true&w=majority", {
  useNewUrlParser: true,
})

const Schema = new mongoose.Schema({
    roomOwner:{
        type:String,
        required: true,
    },
    roomOwnerMail:{
        type:String,
        required: true,
    },
    roomName:{
        type:String,
        required: true,
    },
    roomPassword:{
        type:String,
        required: true,
    },
    roomId:{ 
        type : String,
        required: true, 
    },
    time:{ 
        type : String,
        default: moment().format('llll'), 
    },
})


const Rooms = mongoose.model("Rooms",Schema)
module.exports = Rooms