import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './layoutStyle.css'
import ChatList from '../components/chatList/ChatList'


const DashboardLayout = () => {

  const {userId,isLoaded} =useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if(isLoaded && !userId){
      navigate("/sign-in")
    }
  },
  [isLoaded,userId,navigate])

 

  return (
    <div className='dashboardLayout'>
        <div className="menu">
            <ChatList/>
        </div>
        <div className="content">
            <Outlet/>
        </div>
    </div>
  )
}

export default DashboardLayout