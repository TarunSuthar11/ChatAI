import { useEffect } from "react"
import Sidebar from "../components/Sidebar"
import Navbar from '../components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'

const Layout = () => {

  const {userId,isLoaded} = useAuth()
  const navigate = useNavigate()

  // not logged in
  useEffect(() => {
    if(isLoaded && !userId){
      navigate("/sign-in")
    }
    
  },
  [isLoaded,userId,navigate])

    if(!isLoaded){
    return (
      <div className="flex z-50 h-screen justify-center items-center">
        <img src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif" className="h-25"/>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-(--primary-bg-color)">
      <Sidebar/> 
      <div className="flex-1 flex flex-col bg-(--primary-bg-color) text-(--primary-text-color)">
        <Navbar />
        <main className="flex-1 overflow-hidden ">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout