import { SignUp } from "@clerk/clerk-react"

const SignUpPage = () => {
   return(
    <div className="flex h-screen justify-center items-center">
        <SignUp path='/sign-up' signInUrl='/sign-in' forceRedirectUrl='/'/>
    </div>
   )}
export default SignUpPage