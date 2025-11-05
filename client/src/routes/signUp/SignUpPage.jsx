import React from 'react'
import './signUp.css'
import { SignUp } from '@clerk/clerk-react'

const SignUpPage = () => {
  return (
    <div>
      <SignUp path='/sign-in' />
    </div>
  )
}

export default SignUpPage