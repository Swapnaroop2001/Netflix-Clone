import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ShowCard from "./ShowCard";
import ShowDetails from "../showdetails/ShowDetails";
import { PlayCircle, Info, Bookmark } from "lucide-react";
import { CheckCircle, CircleAlert } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import FullScreenPlayer from "../FullScreenPlayer/FullScreenPlayer"; 
import { toast } from "sonner";
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
  trailerUrl: string;
}

const toastStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  color: "white",
  display: "flex",
  alignItems: "center",
  padding: "20px 30px",
  borderRadius: "12px",
  border: "none",
  boxShadow: "0 6px 8px rgba(0, 0, 0, 0.2)",
  fontSize: "18px",
  maxWidth: "900px",
};

const toastIconError = (
  <CircleAlert style={{ marginRight: "20px", fill: "red" }} />
);
const toastIconSuccess = (
  <CheckCircle style={{ marginRight: "20px", fill: "green" }} />
);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const HomePage: React.FC = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [selectedTrailerUrl, setSelectedTrailerUrl] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE_URL}/shows`, {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
        const data: Show[] = await res.json();
        setShows(
          data.filter((s) => s.poster?.trim() !== "" && s.poster !== "N/A")
        );
      } catch (err) {
        console.error("Failed to fetch shows:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      document.querySelector<HTMLElement>(".carousel-next")?.click();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToWatchlist = async (show: Show) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You need to be logged in to add to watchlist.", {
          icon: toastIconError,
          style: toastStyle,
        });
        return;
      }

      const response = await fetch(`${API_BASE_URL}/watchlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ showId: show._id }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Added to watchlist!", {
          icon: toastIconSuccess,
          style: toastStyle,
        });
      } else {
        toast.error(result.message || "Failed to add to watchlist.", {
          icon: toastIconError,
          style: toastStyle,
        });
      }
    } catch (err) {
      toast.error("Something went wrong!", {
        icon: toastIconError,
        style: toastStyle,
      });
      console.error("Error:", err);
    }
  };

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
                  className="h-[450px] w-full bg-gray-800 rounded-xl"
                />
              ))}
            </div>
          </div>
        </>
      );
    }

    const carouselShows = shows.slice(0, 3);
    const gridShows = shows.slice(3, 33);

    return (
      <>
        <div id="carousel" className="relative z-10">
          <Carousel className="relative">
            <CarouselContent>
              {carouselShows.map((show) => (
                <CarouselItem key={show._id}>
                  <div className="relative w-full h-[550px] lg:h-[1050px] md:h-[750px] sm:h-[650px]">
                    <img
                      src={show.coverImage}
                      alt={show.title}
                      className="w-full h-full object-cover"
                      onError={(e) =>
                        ((e.target as HTMLImageElement).src =
                          "https://placehold.co/300x450?text=No+Image+Available")
                      }
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end pb-30 pl-10 pr-10">
                      <div className="space-y-4 text-white max-w-4xl">
                        <h2 className="text-6xl md:text-8xl font-bold">
                          {show.title}
                        </h2>
                        <p className="text-base md:text-lg text-gray-200 line-clamp-4">
                          {show.fullplot}
                        </p>
                        <p className="text-2xl md:text-3xl text-gray-300">
                          {show.genres.join(", ")}
                        </p>
                        <div className="flex gap-4">
                          <Button
                            className="bg-red-600 hover:bg-red-700 text-white text-sm"
                            onClick={() =>
                              setSelectedTrailerUrl(show.trailerUrl)
                            }
                          >
                            <PlayCircle className="w-5 h-5 mr-1"  />
                            Play
                          </Button>
                          <Button
                            className="bg-white text-black hover:bg-gray-100"
                            onClick={() => setSelectedShow(show)}
                          >
                            <Info className="w-5 h-5 mr-1" />
                            More Info
                          </Button>
                          <Button
                            className="bg-white text-black hover:bg-gray-100"
                            onClick={() => handleAddToWatchlist(show)}
                          >
                            <Bookmark className="w-5 h-5 mr-1"/>
                            Add to Watchlist
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="carousel-prev hidden absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 rounded-full p-2 hover:bg-black/70">
              ←
            </CarouselPrevious>
            <CarouselNext className="carousel-next hidden absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 rounded-full p-2 hover:bg-black/70">
              →
            </CarouselNext>
          </Carousel>
        </div>

        <div className="relative z-20 -mt-20 p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {gridShows.map((show) => (
              <ShowCard
                key={show._id}
                show={show}
                onShowDetails={setSelectedShow}
              />
            ))}
          </div>
        </div>

        {selectedShow && (
          <ShowDetails
            show={selectedShow}
            onClose={() => setSelectedShow(null)}
          />
        )}

        {selectedTrailerUrl && (
          <FullScreenPlayer
            trailerUrl={selectedTrailerUrl}
            onClose={() => setSelectedTrailerUrl(null)}
          />
        )}
      </>
    );
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">{renderContent()}</div>
    </div>
  );
};

export default HomePage;
