import React, { useEffect } from 'react'
import ChatHeader from './components/chat-header'
import MessageBar from './components/message-bar'
import MessageContainer from './components/message-container'
import { useAppStore } from '@/store'

const ChatContainer = () => {

    useEffect(() => {

        const token = localStorage.getItem("token");
        console.log(token)
    }, [])


  return (
    <div className='fixed top-0 h-[100vh] w-[100vw] bg-[#1c1d25] flex flex-col md:static md:flex-1'>
        <ChatHeader/>
        <MessageContainer/>
        <MessageBar/>
    </div>
  )
}

export default ChatContainer