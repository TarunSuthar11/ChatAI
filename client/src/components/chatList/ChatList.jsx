import React from 'react'
import { Link } from 'react-router-dom'
import './chatList.css'

const ChatList = () => {
  return (
    <div className='chatList'>
      <span className='title'>
          Dashboard
      </span>
      <ul>
        <li>
          <Link to='/dashboard'>Create a new Chat</Link>
        </li>
        <li>
          <Link to='/'>Explore</Link>
        </li>
        <li>
          <a href="#" target="_blank" rel="noopener noreferrer">Contact</a>
        </li>
      </ul>
      
      
      
      <hr />

      <div className="list">
        <Link to='/'>Chat 1</Link>
        <Link to='/'>Chat 1</Link>
        <Link to='/'>Chat 1</Link>
        <Link to='/'>Chat 1</Link>
        <Link to='/'>Chat 1</Link>
        <Link to='/'>Chat 1</Link>
      </div>
      <hr />

      <div className="setting">
        <span>Setting</span>
      </div>
    </div>
  )
}

export default ChatList