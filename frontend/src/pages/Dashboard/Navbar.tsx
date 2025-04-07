import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  const getActiveTab = (): "home" | "all" | "watchlist" => {
    if (location.pathname.includes("watchlist")) return "watchlist";
    if (location.pathname.includes("allshows")) return "all";
    return "home";
  };

  const activeTab = getActiveTab();

  return (
    <nav className="flex justify-between items-center p-6 fixed top-0 w-full z-40 bg-gradient-to-r from-black/80 via-transparent to-black/80">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/home")}
      >
        <span className="text-4xl font-extrabold text-red-600">Netflix</span>
      </div>

      <div className="flex gap-4 items-center">
        {(["home", "all", "watchlist"] as const).map((tab) => (
          <Button
            key={tab}
            variant="transparent"
            onClick={() => {
              if (tab === "watchlist") {
                navigate("/watchlist");
              } else if (tab === "all") {
                navigate("/allshows");
              } else {
                navigate("/home");
              }
            }}
            className={`text-2xl font-bold transition ${
              activeTab === tab ? "text-white" : "text-red-600"
            }`}
          >
            {tab === "home"
              ? "Home"
              : tab === "all"
              ? "All Shows"
              : "Watchlist"}
          </Button>
        ))}

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="transparent"
              onClick={() => setIsOpen(true)}
              className="text-2xl font-bold text-red-600 transition ml-4"
            >
              Logout
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black  p-10 border-none rounded-lg w-256">
            <DialogHeader>
              <DialogTitle className="text-xl text-center mb-10 font-semibold text-white">
                Are you sure you want to logout?
              </DialogTitle>
            </DialogHeader>
            <DialogFooter className="flex content-center gap-10 justify-center">
              <Button
                variant="outline"
                className="border-gray-500 rounded-sm text-xl px-6 py-3"
                onClick={() => setIsOpen(false)}
                size='big'
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="bg-red-600 text-white rounded-sm text-xl px-6 py-3"
                onClick={logout}
                size='big'
              >
                Logout
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
};

export default Navbar;
