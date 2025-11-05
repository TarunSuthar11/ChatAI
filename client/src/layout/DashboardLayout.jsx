import { useAuth } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'


const DashboardLayout = () => {

  const {userId,isLoaded} =useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if(isLoaded && !userId){
      navigate("/sign-in")
    }
  },
  [isLoaded,userId,navigate])

  if(!isLoaded) return "loading ..."

  return (
    <div>
        <div className="menu">
            menu
        </div>
        <div className="content">
            <Outlet/>
        </div>
    </div>
  )
}

export default DashboardLayout