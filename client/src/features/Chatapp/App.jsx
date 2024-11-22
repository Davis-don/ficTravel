import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import io from 'socket.io-client'
import { useState,useEffect } from 'react'
import Chat from './components/Chat/Chat'
const socket = io.connect("http://localhost:8000")
import useUserStore from '../../store/userStore'
function App() {
  // const [username,setUserName] = useState("")
  // const [room,setRoom] = useState("")
  const userData = useUserStore((state)=>state.user)
  const room = userData[0].id
  const username = userData[0].fullName
  
  
  const joinRoom=()=>{
    if(username !== "" && room !==""){
      socket.emit("join_room",room)
    }
  }

  useEffect(()=>{
joinRoom()
  },[userData])

  
  return (
    <div className='overall-app-container'>
      {/* <h3 className='text-light'>Join Chat</h3>
      <input onChange={(e)=>setUserName(e.target.value)} type="text" placeholder='john....' /><br/>
      <br/>
      <input onChange={(e)=>setRoom(e.target.value)} type="text" placeholder='Room Id'/><br/><br/>

      <button onClick={joinRoom}>Join a Room</button> */}
      <Chat socket={socket} username={username} room={room}/>
      </div>
  )
}

export default App