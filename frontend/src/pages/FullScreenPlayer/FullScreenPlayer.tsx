import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface FullScreenPlayerProps {
  trailerUrl: string;
  onClose: () => void;
}

const FullScreenPlayer: React.FC<FullScreenPlayerProps> = ({
  trailerUrl,
  onClose,
}) => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose(); 
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscKey);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      setFadeIn(false);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center transition-opacity duration-500 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="w-full h-full flex items-center justify-center px-4">
        <div className="w-full h-full max-w-full aspect-video">
          <ReactPlayer
            url={trailerUrl}
            playing
            controls
            width="100%"
            height="100%"
            className="rounded-none shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default FullScreenPlayer;
