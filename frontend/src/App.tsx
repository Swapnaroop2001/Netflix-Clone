import './App.css'
import Authentication from './pages/authentication/Authentication'
import { Toaster } from "@/components/ui/sonner"


function App() {

  return (
    <>
      <div className="min-h-screen w-full pb-16">
      <Toaster position="top-center" richColors expand />
      <Authentication/>
      </div>
    </>
  )
}

export default App
