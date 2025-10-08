import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

const VideoPage = ({ topic }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      if (!topic) return;

      setLoading(true);
      setError("");
      try {
        // Example: call backend to fetch YouTube videos for topic
        const res = await axios.get(`${API_URL}/api/videos?topic=${encodeURIComponent(topic)}`);
        setVideos(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [topic]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">YouTube Recommendations for "{topic}"</h1>

      {loading && <p>Loading videos...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {videos.map((video) => (
          <div key={video.id} className="bg-white shadow rounded overflow-hidden">
            <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer">
              <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
              <div className="p-2">
                <h2 className="text-sm font-semibold">{video.title}</h2>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPage;
