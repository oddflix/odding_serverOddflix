const mongoose = require('mongoose')
const moment = require('moment')

mongoose.connect("mongodb+srv://admin:NCAV0l5a8wVYTFZW@cluster0.craiv.mongodb.net/maindb?retryWrites=true&w=majority", {
  useNewUrlParser: true,
})

const Schema = new mongoose.Schema({
    sender:{
        type:String,
        required: true,
    },
    msg:{
        type:String,
        required: true,
    },
    gmail:{
        type:String,
        required: true,
    },
    fileurl:{
        type:String,
        default: "hideimg",
    },
    myimage:{
        type:String,
        default: ""
    },
    time:{ 
        type : String,
        default: moment().format('llll'), 
    },
})


const Chats = mongoose.model("Chats",Schema)
module.exports = Chats
