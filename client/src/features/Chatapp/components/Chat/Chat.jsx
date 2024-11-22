import React, { useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './chat.css'
function Chat({socket,username,room}) {
  const [currentMessage,setCurentMessage] = useState("")
  const [messageList,setMessageList] = useState([])

  const sendMessage = async ()=>{
    if(currentMessage !==""){
      
      const messageData = {
        room:room,
        author:username,
        message:currentMessage,
        time:new Date(Date.now()).getHours() +
         ":" + 
         new Date(Date.now()).getMinutes(),
      }
      await socket.emit("send_message",messageData)
      setMessageList((list)=>[...list,messageData])
    };
   
  }

useEffect(()=>{
socket.on("receive_message",(data)=>{
  setMessageList((list)=>[...list,data])
})
},[socket])
  return (
    <div className='overall-chat-component'>
        <div className="chat-header">
          <h1 className='text-light'>Live Chat</h1>
        </div>
        <div className="chat-body">
          {
            messageList.map((messageContent)=>{
              return(<div className="overall-chat-card">
                <div className="chatcard-header">
                  <h4 className='text-success'>{messageContent.author}</h4>
                </div>
                <div className="chatcard-body">
                <p className='text-light'>{messageContent.message}</p>
                </div>
                <div className="chatcard-footer">
                  <h4>{messageContent.time}</h4>
                </div>
               
               </div>
               )
            })
          }
        </div>
        <div className="chat-footer">
          <input className='form-control' onChange={(e)=>setCurentMessage(e.target.value)} type="text" placeholder='send message...' />
          <button className='btn btn-success' onClick={sendMessage} >Send</button>
        </div>
        </div>
  )
}

export default Chat

