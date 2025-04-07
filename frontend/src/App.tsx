
import './App.css'
// import Authentication from './pages/authentication/Authentication'
import { Toaster } from "@/components/ui/sonner"
import HomePage from './pages/Homepage/HomePage'
// import Authentication from './pages/authentication/Authentication'


function App() {

  return (
    <>
      <div className="min-h-screen w-full">
      <Toaster position="top-center" richColors expand />
      {/* <Authentication/> */}
      <HomePage/>
      </div>
    </>
  )
}

export default App
