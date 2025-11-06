import React from 'react'
import './home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home'>
      <div className="left">
        <h1 className='heading'>ChatAI</h1>

        <h2>Step into the future of productivity.</h2>

        <h3>Our AI assistant is designed to seamlessly automate routine tasks, generate creative content, and instantly summarize complex data, freeing you to focus on strategic decisions.</h3>
        <Link to='/dashboard'>
          <button className=''>Get Started</button>
        </Link>
      </div>
      <div className="right">
        <img src="https://bootestech.com/wp-content/uploads/2024/10/web-development-1.gif" alt="" />

      </div>
    </div>
  )
}

export default Home