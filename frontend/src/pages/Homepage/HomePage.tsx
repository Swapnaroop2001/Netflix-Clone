"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ShowCard from "./ShowCard";
import ShowDetails from "../showdetails/ShowDetails";
import { PlayCircle, Info } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface Show {
  _id: string;
  title: string;
  plot: string;
  genres: string[];
  runtime: number;
  metacritic?: number;
  rated: string;
  cast: string[];
  poster: string;
  fullplot: string;
  languages: string[];
  released: string;
  directors: string[];
  writers: string[];
  awards: {
    wins?: number;
    nominations?: number;
    text?: string;
  };
  lastupdated: string;
  year: number;
  imdb: {
    rating?: number;
    votes?: number;
    id?: number;
  };
  countries: string[];
  type: string;
  tomatoes?: {
    viewer?: {
      rating?: number;
      numReviews?: number;
    };
    fresh?: number;
    critic?: {
      rating?: number;
      numReviews?: number;
    };
    rotten?: number;
    lastUpdated?: string;
  };
  num_mflix_comments: number;
  plot_embedding?: number[];
  coverImage: string;
}

// Carousel Item Component
const CarouselShowItem = ({ 
  show, 
  onShowDetails 
}: { 
  show: Show; 
  onShowDetails: (show: Show) => void 
}) => {
  const fallbackImage = "https://placehold.co/300x450?text=No+Image+Available";
  const [imageSrc, setImageSrc] = useState<string>(
    show.coverImage && show.poster.trim() !== "" && show.coverImage !== "N/A"
      ? show.coverImage
      : fallbackImage
  );
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (!hasError) {
      setImageSrc(fallbackImage);
      setHasError(true);
    }
  };

  return (
    <div className="relative w-full h-[1050px] lg:h-[1050px] md:h-[750px] sm:h-[650px] h-[550px]">
      <img
        src={imageSrc}
        alt={show.title}
        className="w-full h-full object-cover"
        onError={handleImageError}
        loading="lazy"
      />
      <div className="absolute min-h-36 inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end pb-20 pl-5">
        <div className="space-y-4 text-white">
          <h2 className="text-8xl font-bold text-left">{show.title || "Untitled"}</h2>
          <p className="text-left text-3xl">
            {show.genres?.join(", ") || "No genres available"}
          </p>
          <p className="text-left text-m">
            {show.genres?.join(", ") || "No genres available"}
          </p>
          <div className="text-left text-m">
            <p>{show.plot?.slice(0, 110) || "No plot available"}</p>
            <p>{show.plot?.slice(110, 220) || "No plot available"}...</p>
          </div>

          <div className="flex gap-4">
            <Button className="bg-white text-black hover:bg-gray-200">
              <PlayCircle className="w-5 h-5 mr-1 transition-transform duration-200 group-hover:rotate-12" />
              Play
            </Button>
            <Button 
              className="bg-white text-black hover:bg-gray-500"
              onClick={() => onShowDetails(show)}
            >
              <Info className="w-5 h-5 mr-1 transition-transform duration-200 group-hover:rotate-12" />
              More Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [activeTab, setActiveTab] = useState<"home" | "all" | "watchlist">("home");
  const [loading, setLoading] = useState(true);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch("http://localhost:5000/shows");
        const data = await response.json();
        const filteredData = data.filter(
          (show: Show) =>
            show.poster && show.poster.trim() !== "" && show.poster !== "N/A"
        );
        setShows(filteredData);
      } catch (error) {
        console.error("Failed to fetch shows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  // Auto-advance carousel every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nextButton = document.querySelector(".carousel-next") as HTMLElement;
      nextButton?.click();
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <Carousel className="w-full relative">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, i) => (
                <CarouselItem key={i} className="w-full">
                  <div className="relative w-full h-[800px]">
                    <Skeleton className="w-full h-full bg-gray-800" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end p-6">
                      <div className="space-y-4 w-full">
                        <Skeleton className="h-6 w-1/2 bg-gray-700" />
                        <Skeleton className="h-4 w-1/3 bg-gray-700" />
                        <div className="flex gap-4">
                          <Skeleton className="h-8 w-24 bg-gray-700" />
                          <Skeleton className="h-8 w-24 bg-gray-700" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {Array.from({ length: 30 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-[300px] w-full bg-gray-800 rounded-xl"
                />
              ))}
            </div>
          </div>
        </>
      );
    }

    const carouselShows = shows.slice(0, 3);
    const gridShows =
      activeTab === "home"
        ? shows.slice(3, 33)
        : activeTab === "all"
        ? shows.slice(3)
        : shows
            .filter((show) => show.title.toLowerCase().includes("watchlist"))
            .slice(5);

    return (
      <>
        <div id="carousel" className="relative z-10">
          <Carousel className="relative">
            <CarouselContent>
              {carouselShows.map((show) => (
                <CarouselItem key={show._id}>
                  <CarouselShowItem 
                    show={show}
                    onShowDetails={setSelectedShow}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden absolute top-1/2 left-4 transform -translate-y-1/2 z-10 opacity-0">
              <CarouselPrevious className="carousel-prev text-white bg-black/50 rounded-full p-2 hover:bg-black/70">
                <span className="text-xl">←</span>
              </CarouselPrevious>
            </div>
            <div className="hidden absolute top-1/2 right-4 transform -translate-y-1/2 z-10 opacity-0">
              <CarouselNext className="carousel-next text-white bg-black/50 rounded-full p-2 hover:bg-black/70">
                <span className="text-xl">→</span>
              </CarouselNext>
            </div>
          </Carousel>
        </div>

        <div className="relative z-20 -mt-20">
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {gridShows.map((show) => (
                <ShowCard 
                  key={show._id} 
                  show={show} 
                  onShowDetails={setSelectedShow} // Added onShowDetails prop
                />
              ))}
            </div>
          </div>
        </div>

        {selectedShow && (
          <ShowDetails
            show={selectedShow}
            onClose={() => setSelectedShow(null)}
          />
        )}
      </>
    );
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col overflow-hidden">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 flex-shrink-0 fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-black/80 via-transparent to-black/80 transition-colors duration-500">
        <h1 className="text-3xl font-bold text-red-600">Netflix</h1>
        <div className="flex gap-4">
          <Button
            variant="transparent"
            onClick={() => setActiveTab("home")}
            className="transition-all duration-300 text-2xl font-bold text-red-600"
          >
            Home
          </Button>
          <Button
            variant="transparent"
            onClick={() => setActiveTab("all")}
            className="transition-all duration-300 text-2xl font-bold text-red-600"
          >
            All Shows
          </Button>
          <Button
            variant="transparent"
            onClick={() => setActiveTab("watchlist")}
            className="transition-all duration-300 text-2xl font-bold text-red-600"
          >
            Watchlist
          </Button>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">{renderContent()}</div>
    </div>
  );
};

export default HomePage;