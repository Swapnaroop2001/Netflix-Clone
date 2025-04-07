"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, PlayCircle, Bookmark } from "lucide-react";
import FullScreenPlayer from "../FullScreenPlayer/FullScreenPlayer";
import { toast } from "sonner";
import { CheckCircle, CircleAlert } from "lucide-react";
interface Show {
  _id: string;
  title: string;
  plot: string;
  fullplot: string;
  genres: string[];
  runtime: number;
  metacritic?: number;
  rated: string;
  cast: string[];
  poster: string;
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

interface ShowDetailsProps {
  show: Show;
  onClose: () => void;
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

const ShowDetails: React.FC<ShowDetailsProps> = ({ show, onClose }) => {
  const fallbackImage = "https://placehold.co/300x450?text=No+Image+Available";
  const posterImage =
    show.poster && show.poster.trim() !== "" && show.poster !== "N/A"
      ? show.poster
      : fallbackImage;

  const [showFullScreen, setShowFullScreen] = useState(false);

  const handlePlay = () => {
    setShowFullScreen(true);
  };

  const handleCloseFullScreen = () => {
    setShowFullScreen(false);
  };

  const handleAddToWatchlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You need to be logged in to add to watchlist.", {
          style: toastStyle,
          icon: toastIconError,
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
          style: toastStyle,
          icon: toastIconSuccess,
        });
      } else {
        toast.error(result.message || "Failed to add to watchlist.", {
          style: toastStyle,
          icon: toastIconError,
        });
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong!", {
        style: toastStyle,
        icon: toastIconError,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black text-white overflow-y-auto">
      {showFullScreen && (
        <FullScreenPlayer
          trailerUrl={show.trailerUrl}
          onClose={handleCloseFullScreen}
        />
      )}

      <div
        className="absolute inset-0 bg-cover bg-top opacity-30"
        style={{ backgroundImage: `url(${posterImage})` }}
      ></div>

      <Button
        variant="transparent"
        className="fixed top-4 right-4 z-50"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </Button>

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="pt-15 pb-5 px-8 bg-gradient-to-b from-black/80 via-black/60 to-transparent">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-red-500">
            {show.title}
          </h1>
          <div className="flex flex-wrap gap-4 items-center justify-center text-sm md:text-base">
            <span>{show.year}</span>
            <span className="border border-gray-500 px-2 rounded">
              {show.rated}
            </span>
            <span>
              {Math.floor(show.runtime / 60)}h {show.runtime % 60}m
            </span>
            {show.imdb?.rating && <span>IMDb: {show.imdb.rating}/10</span>}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 px-8">
          <div className="md:w-1/4 flex-shrink-0">
            <img
              src={posterImage}
              alt={show.title}
              className="w-full rounded-lg shadow-lg mx-auto"
              onError={(e) => (e.currentTarget.src = fallbackImage)}
            />
          </div>

          <div className="md:w-2/3 space-y-4 text-left text-sm md:text-base">
            <p>{show.fullplot || show.plot}</p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-opacity-10 p-3 rounded-md">
                <h3 className="text-xl font-semibold text-red-500">Genres</h3>
                <p>{show.genres?.join(", ") || "N/A"}</p>
              </div>
              <div className="bg-opacity-10 p-3 rounded-md">
                <h3 className="text-xl font-semibold text-red-500">Cast</h3>
                <p>{show.cast?.join(", ") || "N/A"}</p>
              </div>
              <div className="bg-opacity-10 p-3 rounded-md">
                <h3 className="text-xl font-semibold text-red-500">
                  Directors
                </h3>
                <p>{show.directors?.join(", ") || "N/A"}</p>
              </div>
              <div className="bg-opacity-10 p-3 rounded-md">
                <h3 className="text-xl font-semibold text-red-500">Writers</h3>
                <p>{show.writers?.join(", ") || "N/A"}</p>
              </div>
              <div className="bg-opacity-10 p-3 rounded-md">
                <h3 className="text-xl font-semibold text-red-500">
                  Languages
                </h3>
                <p>{show.languages?.join(", ") || "N/A"}</p>
              </div>
              <div className="bg-opacity-10 p-3 rounded-md">
                <h3 className="text-xl font-semibold text-red-500">
                  Countries
                </h3>
                <p>{show.countries?.join(", ") || "N/A"}</p>
              </div>
              {show.awards?.text && (
                <div className="bg-opacity-10 p-3 rounded-md md:col-span-2">
                  <h3 className="text-xl font-semibold text-red-500">Awards</h3>
                  <p>{show.awards.text}</p>
                </div>
              )}
              {show.metacritic && (
                <div className="bg-opacity-10 p-3 rounded-md">
                  <h3 className="text-xl font-semibold text-red-500">
                    Metacritic
                  </h3>
                  <p>{show.metacritic}/100</p>
                </div>
              )}
              {show.tomatoes?.viewer?.rating && (
                <div className="bg-opacity-10 p-3 rounded-md">
                  <h3 className="text-xl font-semibold text-red-500">
                    Rotten Tomatoes
                  </h3>
                  <p>Viewer Rating: {show.tomatoes.viewer.rating}/5</p>
                  {show.tomatoes.fresh && show.tomatoes.rotten && (
                    <p>
                      Critics: {show.tomatoes.fresh} Fresh /{" "}
                      {show.tomatoes.rotten} Rotten
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 mt-4">
              <Button
                onClick={handlePlay}
                className="bg-red-600 hover:bg-red-700 text-white text-sm"
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                Play
              </Button>
              <Button
                onClick={handleAddToWatchlist}
                variant="outline"
                className="border-gray-300 text-black text-sm"
              >
                <Bookmark className="w-5 h-5 mr-2" />
                Add to Watchlist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
