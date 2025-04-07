import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Info, Star, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

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

interface ShowCardProps {
  show: Show;
  onShowDetails: (show: Show) => void;
}

const ShowCard: React.FC<ShowCardProps> = ({ show, onShowDetails }) => {
  const fallbackImage = "https://placehold.co/300x450?text=No+Image+Available";
  const [imageSrc, setImageSrc] = useState<string>(
    show.poster && show.poster.trim() !== "" && show.poster !== "N/A"
      ? show.poster
      : fallbackImage
  );
  const [hasError, setHasError] = useState(false);

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

  return (
    <Card className="bg-gray-900 text-left border-none text-white overflow-hidden group relative w-full h-full transition-all duration-300 hover:shadow-xl hover:shadow-red-900/20">
      <div className="relative w-full h-full aspect-[2/3]">
        <img
          src={imageSrc}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          onError={handleImageError}
          loading="lazy"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <CardContent className="p-4 h-full flex flex-col justify-end">
            {/* Bookmark Button */}
            <button
              onClick={() => console.log("Bookmarked:", show._id)} // Replace with actual handler
              className="absolute top-2 right-2 z-10 p-1 rounded-full bg-black/60 hover:bg-black/80 transition-all duration-300 text-white hover:scale-110"
              aria-label="Bookmark show"
            >
              <Bookmark className="w-10 h-10" />
            </button>
            <div className="space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
              <h3 className="text-lg font-semibold line-clamp-1 transition-colors duration-200 group-hover:text-red-400">
                {title}
              </h3>
              <div className="flex items-center gap-2 flex-wrap text-sm text-gray-300 group-hover:text-gray-200">
                <Badge variant="secondary" className="bg-red-600/80">
                  {rated}
                </Badge>
                <span>{year}</span>
                <span>{runtime}</span>
                {imdbRating && (
                  <span className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4" /> {imdbRating}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-300 line-clamp-2 group-hover:text-gray-100">
                {plot}
              </p>

              {/* Genres */}
              {show.genres?.length > 0 && (
                <div className="flex gap-2 overflow-x-auto no-scrollbar pt-1">
                  {show.genres.map((genre, idx) => (
                    <Badge
                      key={idx}
                      className="bg-gray-800 text-white border-gray-700 text-xs rounded-full"
                    >
                      {genre}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex gap-2 pt-3">
                <Button
                  size="sm"
                  className="bg-white text-black hover:bg-gray-200 group-hover:scale-105"
                >
                  <PlayCircle className="w-4 h-4 mr-1 group-hover:rotate-12" />
                  Play
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-gray-600 hover:bg-gray-500 group-hover:scale-105"
                  onClick={() => onShowDetails(show)} // Added onClick handler
                >
                  <Info className="w-4 h-4 mr-1 group-hover:rotate-12" />
                  Info
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default ShowCard;
