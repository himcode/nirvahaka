const http = require("http")
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io")

const app = express();

const users = [{}];

app.use(cors())
const port = 4500 || process.env.PORT;

app.get("/", (req, res) => {
  res.send("Server");
})

const server = http.createServer(app)

const io = socketIO(server);
io.on("connection", (socket) => {
  console.log("New Connection")

  socket.on('joined', ({ user }) => {

    users[socket.id] = user;
    console.log(`${user} has joined `);
    socket.broadcast.emit('userJoined', { user: "Admin", message: ` ${user} has joined` });
    socket.emit('welcome', { user: "Admin", message: `Welcome to the chat,${user}` })
    
  })

  socket.on('message', ({ message,id})=>{
    io.emit('sendMessage',{user:users[id],message,id})
  })

  socket.on('dc',()=>{
    socket.broadcast.emit('leave',{user:'Admin',message:`${users[socket.id]}  has left`})
  })

});

server.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`)
})

