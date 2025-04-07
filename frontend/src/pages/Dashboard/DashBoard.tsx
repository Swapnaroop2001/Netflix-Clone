import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Dashboard() {
  

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col">
      <Navbar/> 
      <div className="flex-1 overflow-y-auto">
      <Outlet />
      </div>
    </div>
  );
}
