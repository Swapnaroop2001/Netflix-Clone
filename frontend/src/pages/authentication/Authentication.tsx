import { Signup } from "./Signup";
import { Login } from "./Login";
import { useState } from "react";
import nflxBg from "../../assets/nflx-bg.jpg";

export default function Authentication() {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-black p-6 md:p-10 fixed inset-0 text-white"
      style={{
        backgroundImage: `url(${nflxBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: 1, 
      }}
    >
      <div className="h-screen w-full absolute inset-0 bg-black opacity-30 "/>
      <div className="w-full max-w-sm flex flex-col gap-6 z-10 relative">
        {showSignup ? (
          <Signup onSwitch={() => setShowSignup(false)} />
        ) : (
          <Login onSwitch={() => setShowSignup(true)} />
        )}
      </div>
    </div>
  );
}
