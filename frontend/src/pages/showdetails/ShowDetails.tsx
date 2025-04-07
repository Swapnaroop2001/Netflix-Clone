import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { PlayCircle, Bookmark } from 'lucide-react';
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
}

interface ShowDetailsProps {
  show: Show;
  onClose: () => void;
}

const ShowDetails: React.FC<ShowDetailsProps> = ({ show, onClose }) => {
  const fallbackImage = "https://placehold.co/300x450?text=No+Image+Available";
  const posterImage = show.poster && show.poster.trim() !== "" && show.poster !== "N/A"
    ? show.poster
    : fallbackImage;

  // Placeholder function for Play button
  const handlePlay = () => {
    console.log("Play button clicked");
    // Replace with logic to play the show (e.g., navigate to a player page)
  };

  // Placeholder function for Add to Watchlist button
  const handleAddToWatchlist = () => {
    console.log("Add to Watchlist button clicked");
    // Replace with logic to add the show to the watchlist (e.g., update state or API call)
  };

  return (
    <div className="fixed inset-0 z-50 bg-black text-white overflow-y-auto">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-top opacity-30"
        style={{ backgroundImage: `url(${posterImage})` }}
      ></div>

      {/* Close Button */}
      <Button
        variant="ghost"
        className="fixed top-4 right-4 z-50 text-white "
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </Button>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header Section */}
        <div className="pt-15 pb-5 px-8 bg-gradient-to-b from-black/80 via-black/60 to-transparent">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-red-500">{show.title}</h1>
          <div className="flex flex-wrap gap-5 items-center">
            <span className="text-xl">{show.year}</span>
            <span className="text-xl border border-gray-500 px-2 rounded">{show.rated}</span>
            <span className="text-xl">{Math.floor(show.runtime / 60)}h {show.runtime % 60}m</span>
            {show.imdb?.rating && (
              <span className="text-xl">IMDb: {show.imdb.rating}/10</span>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8 px-8">
          {/* Poster */}
          <div className="md:w-1/4 flex-shrink-0">
            <img
              src={posterImage}
              alt={show.title}
              className="w-full rounded-lg shadow-lg mx-auto"
              onError={(e) => (e.currentTarget.src = fallbackImage)}
            />
          </div>

          {/* Details */}
          <div className="md:w-2/3 space-y-2 text-left">
            <p className="text-xl">{show.fullplot || show.plot}</p>
            
            {/* Genres Card */}
            <div className=" bg-opacity-0.1 p-4 rounded-md">
              <h3 className="text-3xl font-semibold text-red-500">Genres</h3>
              <p className="text-xl">{show.genres?.join(", ") || "N/A"}</p>
            </div>

            {/* Cast Card */}
            <div className=" bg-opacity-50 p-4 rounded-md">
              <h3 className="text-3xl font-semibold text-red-500">Cast</h3>
              <p className="text-xl">{show.cast?.join(", ") || "N/A"}</p>
            </div>

            {/* Directors Card */}
            <div className=" bg-opacity-50 p-4 rounded-md">
              <h3 className="text-3xl font-semibold text-red-500">Directors</h3>
              <p className="text-xl">{show.directors?.join(", ") || "N/A"}</p>
            </div>

            {/* Writers Card */}
            <div className=" bg-opacity-50 p-4 rounded-md">
              <h3 className="text-3xl font-semibold text-red-500">Writers</h3>
              <p className="text-xl">{show.writers?.join(", ") || "N/A"}</p>
            </div>

            {/* Languages Card */}
            <div className=" bg-opacity-50 p-4 rounded-md">
              <h3 className="text-3xl font-semibold text-red-500">Languages</h3>
              <p className="text-xl">{show.languages?.join(", ") || "N/A"}</p>
            </div>

            {/* Countries Card */}
            <div className=" bg-opacity-50 p-4 rounded-md">
              <h3 className="text-3xl font-semibold text-red-500">Countries</h3>
              <p className="text-xl">{show.countries?.join(", ") || "N/A"}</p>
            </div>

            {show.awards?.text && (
              <div className=" bg-opacity-50 p-4 rounded-md">
                <h3 className="text-3xl font-semibold text-red-500">Awards</h3>
                <p>{show.awards.text}</p>
              </div>
            )}

            {show.metacritic && (
              <div className=" bg-opacity-50 p-4 rounded-md">
                <h3 className="text-3xl font-semibold text-red-500">Metacritic</h3>
                <p className="text-xl">{show.metacritic}/100</p>
              </div>
            )}

            {show.tomatoes?.viewer?.rating && (
              <div className=" bg-opacity-50 p-4 rounded-md">
                <h3 className="text-3xl font-semibold text-red-500">Rotten Tomatoes</h3>
                <p className="text-xl">Viewer Rating: {show.tomatoes.viewer.rating}/5</p>
                {show.tomatoes.fresh && show.tomatoes.rotten && (
                  <p className="text-xl">Critics: {show.tomatoes.fresh} Fresh / {show.tomatoes.rotten} Rotten</p>
                )}
              </div>
            )}

            {/* Play and Add to Watchlist Buttons */}
          <div className="flex items-center gap-4 mt-4">
            <Button onClick={handlePlay} className="bg-red-600 hover:bg-red-700 text-white">
              <PlayCircle className="w-5 h-5 mr-2" />
              Play
            </Button>
            <Button onClick={handleAddToWatchlist} variant="outline" className="border-gray-300 text-black">
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