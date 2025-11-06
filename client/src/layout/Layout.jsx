import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { ClerkProvider, SignedIn, SignedOut, SignInButton, useAuth, UserButton} from '@clerk/clerk-react' 
import './layoutStyle.css'
import { useEffect } from 'react'


const Layout = () => {
  const {userId, isLoaded} = useAuth()



  if(!isLoaded){
    return (
      <div className="loading">
        <img src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif" alt="" height="180px" />
      </div>
    )
  }


  return (
    
      <div className='layout'>
          <header className='header'>
            
              <div className="logo">
                  <span className='chat'>Chat</span>
                  <span className='ai'>AI</span>
              </div>
            
            <div className="user">
            {isLoaded?(userId?(
                <SignedIn>
                    <UserButton />
                </SignedIn>
              ):(<Link to='/dashboard'>
                  <button className='btn'> Get Started </button>
                </Link>)):(<></>)
              }
            </div>
              
          </header>
          <div className="main">
            <Outlet />
          </div>
      </div>
    
  )
}

export default Layout