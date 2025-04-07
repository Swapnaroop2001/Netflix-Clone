import React, { useState, useEffect } from "react";
import axios from "axios";
import WatchlistCard from "./WatchListCard";
import { Skeleton } from "@/components/ui/skeleton";

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
  trailerUrl:string;
}
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Watchlist: React.FC = () => {
  const [watchlist, setWatchlist] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/watchlist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWatchlist(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch watchlist");
        setLoading(false);
        console.error(err);
      }
    };

    fetchWatchlist();
  }, []);

  if (loading) {
    return (
      <div className="watchlist mt-20 px-8">
        <Skeleton className="h-9 w-1/4 bg-gray-700 mb-6 mx-auto" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <Skeleton
              key={idx}
              className="max-w-[300px] h-[400px] bg-gray-800 rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-white text-center mt-20">{error}</div>;
  }

  const handleShowDetails = (show: Show) => {
    console.log("Show Details:", show);
  };

  return (
    <div className="watchlist mt-20 px-8 bg-black min-h-screen">
      <h1 className="text-center text-4xl text-white font-extrabold mb-10">My Watchlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {watchlist.map((show) => (
          <WatchlistCard
            key={show._id}
            show={show}
            onShowDetails={handleShowDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;