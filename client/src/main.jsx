import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'

//pages imported
import Dashboard from './routes/dashboard/Dashboard'
import Home from './routes/home/Home'
import Chat from './routes/chat/Chat'
import Layout from './layout/Layout'
import DashboardLayout from './layout/DashboardLayout'
import SignInPage from './routes/signIn/SignInPage'
import SignUpPage from './routes/signUp/SignUpPage'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}




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
            path: '/dashboard',
            element: <Dashboard />
          },
          {
            path: '/dashboard/chats/:id',
            element: <Chat />
          }
        ]
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
)
