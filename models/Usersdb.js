const mongoose = require('mongoose')
const moment = require('moment')

mongoose.connect("mongodb+srv://admin:NCAV0l5a8wVYTFZW@cluster0.craiv.mongodb.net/maindb?retryWrites=true&w=majority", {
  useNewUrlParser: true,
})

const UsersdbSchema = new mongoose.Schema({
    username:{
        type:String,
        default: "",
    },
    gmail:{
        type:String,
        default: "",
    },
    image:{
        type:String,
        default: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/768px-Circle-icons-profile.svg.png"
    },
    time:{ 
        type : String,
        default: moment().format('llll'), 
    },
})


const Users = mongoose.model("Users",UsersdbSchema)
module.exports = Users