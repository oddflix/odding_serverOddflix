const mongoose = require('mongoose')
const moment = require('moment')

mongoose.connect("mongodb+srv://admin:NCAV0l5a8wVYTFZW@cluster0.craiv.mongodb.net/maindb?retryWrites=true&w=majority", {
  useNewUrlParser: true,
})

const OnlinedbSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
    },
    gmail:{
        type:String,
        required: true,
    },
    time:{ 
        type : Date,
        default: Date.now 
    },
})


const Online = mongoose.model("Online",OnlinedbSchema)
module.exports = Online