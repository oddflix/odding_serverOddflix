const mongoose = require('mongoose')
const moment = require('moment')

mongoose.connect("mongodb+srv://admin:NCAV0l5a8wVYTFZW@cluster0.craiv.mongodb.net/maindb?retryWrites=true&w=majority", {
  useNewUrlParser: true,
})

const ChatdbSchema = new mongoose.Schema({
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
        default: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/768px-Circle-icons-profile.svg.png"
    },
    time:{ 
        type : Date,
        default: moment().format('llll'), 
    },
})


const Chat = mongoose.model("Chat",ChatdbSchema)
module.exports = Chat
