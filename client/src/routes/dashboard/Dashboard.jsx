import React from 'react'
import './dashboard.css'

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className='center'>
        <h1 className='heading'>ChatAI</h1>
        <div className='options'>

        </div>
      </div>
      <div className='chatInput'>
        <form action="" className='chatForm'>
          <div className="in">
            <input type="text" className='input' placeholder='Ask ChatAI'/>
          </div>

          <div className="search">
          <button>
              <img src="https://cdn-icons-png.flaticon.com/512/189/189253.png" alt="" />
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Dashboard