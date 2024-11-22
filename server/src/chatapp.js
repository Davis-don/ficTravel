import express from 'express'
const app = express()
import http from 'http'
import cors from 'cors'
import {Server} from 'socket.io'
app.use(cors())

const server = http.createServer(app);

const io = new Server(server,{
  cors:{
    origin:"http://localhost:5173",
    methods:["POST","DELETE","GET","PATCH"]
  }
})

io.on("connection",(socket)=>{
  console.log(`user connected ${socket.id}`);

  socket.on("join_room",(data)=>{
    socket.join(data)
    console.log(`user with id ${socket.id} joined room ${data}`)
    })

   socket.on("send_message",(data)=>{
    socket.to(data.room).emit("receive_message",data)
   })


    socket.on("disconnect",()=>{
      console.log("User disconnected",socket.id);
    })
})





server.listen(8000,()=>{
  console.log("listening at port 8000")
})