import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import Dashboard from './routes/dashboard/Dashboard'
import Home from './routes/home/Home'
import Chat from './routes/chat/Chat'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layout/Layout.jsx'
import DashboardLayout from './layout/DashboardLayout.jsx'
import SignInPage from './routes/signIn/SignInPage.jsx'
import SignUpPage from './routes/signUp/SignUpPage.jsx'



// const router = createBrowserRouter(
//   createRoutesFromChildren(
//     <Route>

//     </Route>
//   )
// )

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/sign-in/*',
        element: <SignInPage />
      },
      {
        path: '/sign-up/*',
        element: <SignUpPage />
      },
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          
          {
            path:'/dashboard',
            element: <Dashboard/>
          },
          {
            path:'/dashboard/chats/:id',
            element: <Chat/>
          }
        ]
      }
    ]
  },
  ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />  
  </StrictMode>,
)
