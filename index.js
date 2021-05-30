const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT|| 5000;
const UsersModel = require("./models/Usersdb.js")
const ChatModel = require("./models/Chatdb.js")

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:NCAV0l5a8wVYTFZW@cluster0.craiv.mongodb.net/maindb?retryWrites=true&w=majority";

//POST
app.post("/register", async (req, res) =>{
  // const username = req.body.username
  // const gmail = req.body.gmail
  // const image = req.body.image

  const username = "req.body.username"
  const gmail = "req.body.gmail"
  const image = "req.body.image"

  const user = new UsersModel({username:username, gmail: gmail, image: image})
  try {
    await user.save()
    res.send("sent data")
  } catch (err) {
    console.log(err)
  }
})

app.post("/newmsg", async (req, res) =>{
  const sender = req.body.sender
  const msg = req.body.msg
  const gmail = req.body.gmail
  const myimage = req.body.myimage
  const fileurl = req.body.fileurl
  
  const chat = new ChatModel({sender:sender, msg: msg,  gmail: gmail, myimage: myimage, fileurl: fileurl})
  try {
    await chat.save()
    res.send("sent data")
  } catch (err) {
    console.log(err)
  }
})


//GET 
app.get('/users', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("maindb");
    
    dbo.collection("users").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result)
      db.close();
    });
  });
});

app.get('/chats', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("maindb");
    
    dbo.collection("chats").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result)
      db.close();
    });
  });
});


// CHAT'I SIFIRLA
app.post('/clearchat', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("maindb");
    dbo.collection("chats").drop(function(err, delOK) {
      if (err) throw err;
    });
    dbo.createCollection("chats", function(err, res) {
      if (err) throw err;
      db.close();
    });
  });
});




app.listen(PORT, ()=>{
    console.log("server running")
})