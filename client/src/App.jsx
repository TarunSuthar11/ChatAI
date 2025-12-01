import { BrowserRouter, Routes, Route } from "react-router-dom"
// all routes imports
import ChatPage from "./routes/ChatPage"
import SignUpPage from "./routes/SignUpPage"
import SignInPage from "./routes/SignInPage"
import Layout from "./Layout/Layout"
import Home from "./routes/Home"

// context import
import { SidebarProvider } from "./context/sidebarContext"
import { ThemeProvider } from "./context/themeContext"

function App() {

  return (
    <SidebarProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>} >
              <Route path="/" element={<Home/>} />
              <Route path="/c/:id" element={<ChatPage/>} />
            </Route>
              <Route path="/sign-up" element={<SignUpPage/>} />
              <Route path="/sign-in" element={<SignInPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </SidebarProvider>
  )
}

export default App
