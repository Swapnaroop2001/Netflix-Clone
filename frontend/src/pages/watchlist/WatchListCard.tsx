"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import FullScreenPlayer from "../FullScreenPlayer/FullScreenPlayer"; 

interface Show {
  _id: string;
  title: string;
  plot: string;
  genres: string[];
  runtime: number;
  rated: string;
  poster: string;
  imdb: {
    rating?: number;
  };
  year: number;
  trailerUrl: string; 
}

interface WatchlistCardProps {
  show: Show;
  onShowDetails: (show: Show) => void;
}

const WatchlistCard: React.FC<WatchlistCardProps> = ({ show, onShowDetails }) => {
  const fallbackImage = "https://placehold.co/300x450?text=No+Image+Available";
  const [imageSrc, setImageSrc] = useState<string>(
    show.poster && show.poster.trim() !== "" && show.poster !== "N/A"
      ? show.poster
      : fallbackImage
  );
  const [hasError, setHasError] = useState(false);
 
  const [showFullScreen, setShowFullScreen] = useState(false);

  const title = show.title || "Untitled";
  const plot = show.plot || "No plot description available";
  const rated = show.rated || "NR";
  const year = show.year || "Unknown";
  const runtime = show.runtime ? `${show.runtime} min` : "N/A";
  const imdbRating = show.imdb?.rating;

  const handleImageError = () => {
    if (!hasError) {
      setImageSrc(fallbackImage);
      setHasError(true);
    }
  };

 
  const handlePlay = () => {
    setShowFullScreen(true);
  };


  const handleCloseFullScreen = () => {
    setShowFullScreen(false);
  };

  return (
    <>
  
      {showFullScreen && (
        <FullScreenPlayer
          trailerUrl={show.trailerUrl}
          onClose={handleCloseFullScreen}
        />
      )}

      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="min-w-[300px] max-w-[300px] cursor-pointer"
        onClick={() => onShowDetails(show)}
      >
        <Card className="bg-gray-900 text-left border-none text-white overflow-hidden group relative w-[300px] h-[490px] transition-all duration-300 hover:shadow-lg hover:shadow-red-900/20">
          <div className="relative w-full h-full aspect-[2/3]">
            <img
              src={imageSrc}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              onError={handleImageError}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              <CardContent className="p-2 h-full flex flex-col justify-end">
                <div className="space-y-1 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                  <h3 className="text-sm font-semibold line-clamp-1 group-hover:text-red-400">
                    {title}
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap text-xs text-gray-300 group-hover:text-gray-200">
                    <Badge
                      variant="secondary"
                      className="bg-red-600/80 text-xs px-1.5 py-0.5"
                    >
                      {rated}
                    </Badge>
                    <span>{year}</span>
                    <span>{runtime}</span>
                    {imdbRating && (
                      <span className="flex items-center gap-1 text-yellow-400">
                        <span className="text-sm">⭐</span> {imdbRating}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-300 line-clamp-2 group-hover:text-gray-100">
                    {plot}
                  </p>
                  {show.genres?.length > 0 && (
                    <div className="flex gap-1 overflow-x-auto no-scrollbar pt-1">
                      {show.genres.map((genre, idx) => (
                        <Badge
                          key={idx}
                          className="bg-gray-800 text-white border-gray-700 text-[10px] rounded-full px-2 py-0.5"
                        >
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2 pt-2 items-center">
                    <Button
                      size="sm"
                      className="bg-red-600 text-black hover:bg-gray-200 px-2 py-1 text-xs group-hover:scale-105"
                      onClick={handlePlay}
                    >
                      <PlayCircle className="w-4 h-4 mr-1 group-hover:rotate-12" />
                      Watch Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </motion.div>
    </>
  );
};

export default WatchlistCard;
