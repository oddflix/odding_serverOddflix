const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT|| 5000;
const Users = require("./models/Users.js")
const Chats = require("./models/Chats.js")
const Rooms = require("./models/Rooms.js")

var MongoClient = require('mongodb').MongoClient;
function url(collection) {
  return "mongodb+srv://admin:NCAV0l5a8wVYTFZW@cluster0.craiv.mongodb.net/"+collection+"?retryWrites=true&w=majority"
}


///////////////////////////////////////////////////////////////////////////////////// USER
app.post("/register", async (req, res) =>{
  const username = "req.body.username"
  const gmail = "req.body.gmail"
  const image = "req.body.image"

  const user = new Users({username:username, gmail: gmail, image: image})
  try {
    await user.save()
    res.send("sent data")
  } catch (err) {
    console.log(err)
  }
})

app.get('/users', function(req, res) {
  MongoClient.connect(url("maindb"), function(err, db) {
    if (err) throw err;
    var dbo = db.db("maindb");
    
    dbo.collection("users").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result)
      db.close();
    });
  });
});



///////////////////////////////////////////////////////////////////////////////////// CHAT
app.post("/newmsg", async (req, res) =>{
  const sender = req.body.sender
  const msg = req.body.msg
  const gmail = req.body.gmail
  const myimage = req.body.myimage
  const fileurl = req.body.fileurl

  const chat = new Chats({sender:sender, msg: msg,  gmail: gmail, myimage: myimage, fileurl: fileurl})
  try {
    await chat.save()
    res.send("sent data")
  } catch (err) {
    console.log(err)
  }
})


app.get('/chats', function(req, res) {
  MongoClient.connect(url("maindb"), function(err, db) {
    if (err) throw err;
    var dbo = db.db("maindb");
    dbo.collection("chats").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result)
      db.close();
    });
  });
});


app.post('/clearchat', function(req, res) {
  MongoClient.connect(url("maindb"), function(err, db) {
    if (err) throw err;
    var dbo = db.db("maindb");
    dbo.collection("chats").drop(function(err, delOK) {
      if (err) throw err; // CHAT'I SIFIRLA
    });
    dbo.createCollection("chats", function(err, res) {
      if (err) throw err;
      db.close();
    });
  });
});

///////////////////////////////////////////////////////////////////////////////////// ROOMS
app.post("/createRoom", async (req, res) =>{
  const roomOwner = req.body.roomOwner
  const roomName = req.body.roomName
  const roomPassword = req.body.roomPassword
  const roomId = Math.random().toString(36).substring(2,20).slice(2)

  MongoClient.connect(url("rooms"), function(err, db) {
    if (err) throw err;
    var dbo = db.db("rooms");
    dbo.createCollection(roomId, function(err, res) {
      if (err) throw err;
      db.close();
    });
  });

  const user = new Rooms({roomOwner:roomOwner, roomName:roomName, roomPassword: roomPassword, roomId: roomId})
  try {
    await user.save()
    res.send("sent data")
  } catch (err) {
    console.log(err)
  }
})


app.get('/rooms', function(req, res) {
  MongoClient.connect(url("maindb"), function(err, db) {
    if (err) throw err;
    var dbo = db.db("maindb");
    dbo.collection("rooms").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
});


///////////////////////////////////////////////////////////////////////////////////// 


app.listen(PORT, ()=>{
    console.log("server running")
})