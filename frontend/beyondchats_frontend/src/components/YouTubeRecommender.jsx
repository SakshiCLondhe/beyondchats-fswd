import React, { useState } from "react";

const YouTubeRecommender = ({ query }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=5&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
      );
      const data = await res.json();
      setVideos(data.items || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-2">Recommended YouTube Videos</h2>
      <div className="flex mb-2">
        <input
          type="text"
          placeholder="Enter topic or PDF chapter"
          value={query}
          onChange={() => setVideos([])}
          className="flex-1 p-2 border rounded-l"
        />
        <button onClick={fetchVideos} className="bg-red-500 text-white px-3 rounded-r">
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      <ul>
        {videos.map((video) => (
          <li key={video.id.videoId} className="mb-2">
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              {video.snippet.title}
            </a>
            <p className="text-sm text-gray-600">{video.snippet.channelTitle}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YouTubeRecommender;
