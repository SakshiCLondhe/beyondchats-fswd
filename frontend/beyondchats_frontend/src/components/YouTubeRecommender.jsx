import React, { useState, useEffect } from "react";

// Debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

const YouTubeRecommender = ({ query }) => {
  const [inputValue, setInputValue] = useState(query || "");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(inputValue, 800);

  const fetchVideos = async (searchQuery) => {
    if (!searchQuery) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          searchQuery
        )}&type=video&maxResults=5&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
      );
      const data = await res.json();
      setVideos(data.items || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (debouncedQuery) fetchVideos(debouncedQuery);
    else setVideos([]);
  }, [debouncedQuery]);

  useEffect(() => {
    if (query) setInputValue(query);
  }, [query]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-red-600 mb-4 text-center drop-shadow-md">
        Recommended YouTube Videos 🎥
      </h2>
      <p className="text-center text-gray-700 mb-6">
        Search for any topic or PDF chapter to get the best NCERT YouTube videos.
      </p>

      <input
        type="text"
        placeholder="Enter topic or chapter..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full p-3 border-2 border-gray-300 rounded-full mb-6 focus:ring-2 focus:ring-red-400 outline-none"
      />

      {loading && <p className="text-center text-gray-500">Loading videos...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <a
            key={video.id.videoId}
            href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
            target="_blank"
            rel="noreferrer"
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={video.snippet.thumbnails.high.url}
              alt={video.snippet.title}
              className="w-full h-44 object-cover"
            />
            <div className="p-3">
              <h3 className="font-semibold text-gray-800 hover:text-red-600">
                {video.snippet.title.length > 60
                  ? video.snippet.title.slice(0, 60) + "..."
                  : video.snippet.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{video.snippet.channelTitle}</p>
            </div>
          </a>
        ))}

        {/* Sample placeholder cards if API doesn't return videos */}
        {videos.length === 0 && !loading &&
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 animate-pulse h-64 rounded-xl shadow-lg flex items-center justify-center text-gray-400 font-semibold"
            >
              Sample Video {i + 1}
            </div>
          ))}
      </div>
    </div>
  );
};

export default YouTubeRecommender;
