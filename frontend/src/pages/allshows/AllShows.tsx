"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AllShowsCard from "./AllshowsCard"; 
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import ShowDetails from "../showdetails/ShowDetails"; 

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
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AllShows = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/shows`);
        setShows(response.data);
      } catch (error) {
        console.error("Error fetching shows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  const genreMap: Record<string, Show[]> = {};
  shows.forEach((show) => {
    show.genres.forEach((genre) => {
      if (!genreMap[genre]) {
        genreMap[genre] = [];
      }
      genreMap[genre].push(show);
    });
  });

  return (
    <div className="bg-black min-h-screen pt-24 pb-10 px-8 overflow-x-hidden">
      <h1 className="text-center text-4xl text-white font-extrabold mb-10">
        Browse All Shows
      </h1>

      {loading ? (
        <div className="space-y-12">
          {Array.from({ length: 3 }).map((_, genreIndex) => (
            <div key={genreIndex} className="mb-12">
              <Skeleton className="h-8 w-1/4 bg-gray-700 mb-4" />
              <div className="w-full overflow-x-auto scrollbar-hide">
                <div className="flex gap-4">
                  {Array.from({ length: 10 }).map((_, cardIndex) => (
                    <Skeleton
                      key={cardIndex}
                      className="min-w-[200px] h-[300px] bg-gray-800 rounded-xl"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        Object.entries(genreMap).map(([genre, genreShows]) => (
          <div key={genre} className="mb-12">
            <h2 className="text-2xl text-white font-semibold mb-4">{genre}</h2>
            <div className="w-full overflow-x-auto scrollbar-hide">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex gap-4"
              >
                {genreShows.slice(0, 15).map((show) => (
                  <AllShowsCard
                    key={show._id}
                    show={show}
                    onShowDetails={setSelectedShow}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        ))
      )}

      {selectedShow && (
        <ShowDetails
          show={selectedShow}
          onClose={() => setSelectedShow(null)}
        />
      )}
    </div>
  );
};

export default AllShows;
