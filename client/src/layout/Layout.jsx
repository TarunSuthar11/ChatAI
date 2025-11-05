import React from 'react'
import { Outlet } from 'react-router-dom'
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton} from '@clerk/clerk-react' 

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const Layout = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <div>
          <header>
            <div className="logo">
                <span>Chat</span>
                <span>AI</span>
            </div>
            <div className="user">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
              
          </header>
          <Outlet />
      </div>
    </ClerkProvider>
  )
}

export default Layout