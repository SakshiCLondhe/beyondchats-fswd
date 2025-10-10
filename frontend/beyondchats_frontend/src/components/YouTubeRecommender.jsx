import React, { useState, useEffect } from "react";

// Sample local data instead of YouTube API
const sampleVideos = [
  {
    id: "1",
    title: "Understanding AI in 10 Minutes",
    channelTitle: "TechSimplified",
    thumbnail: "https://img.youtube.com/vi/2ePf9rue1Ao/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=2ePf9rue1Ao",
  },
  {
    id: "2",
    title: "React JS Crash Course 2025",
    channelTitle: "CodeWithHarry",
    thumbnail: "https://img.youtube.com/vi/w7ejDZ8SWv8/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
  },
  {
    id: "3",
    title: "NCERT Class 10 Physics Chapter 1 - Chemical Reactions",
    channelTitle: "ExamFear Education",
    thumbnail: "https://img.youtube.com/vi/ytXt3YIhAo0/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=ytXt3YIhAo0",
  },
  {
    id: "4",
    title: "Learn HTML & CSS Full Course",
    channelTitle: "freeCodeCamp.org",
    thumbnail: "https://img.youtube.com/vi/mU6anWqZJcc/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=mU6anWqZJcc",
  },
  {
    id: "5",
    title: "JavaScript for Beginners",
    channelTitle: "Programming with Mosh",
    thumbnail: "https://img.youtube.com/vi/W6NZfCO5SIk/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
  },
];

const YouTubeRecommender = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredVideos, setFilteredVideos] = useState(sampleVideos);

  useEffect(() => {
    if (!inputValue.trim()) {
      setFilteredVideos(sampleVideos);
    } else {
      const results = sampleVideos.filter((v) =>
        v.title.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredVideos(results);
    }
  }, [inputValue]);

  return (
    <div className="p-6 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-red-600 mb-3 drop-shadow-md">
        Recommended YouTube Videos 🎥
      </h2>
      <p className="text-gray-700 mb-6">
        Explore top educational and coding videos curated for you.
      </p>

      <input
        type="text"
        placeholder="Search topic (e.g. Physics, React, AI)..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full sm:w-2/3 p-3 border-2 border-gray-300 rounded-full mb-6 focus:ring-2 focus:ring-red-400 outline-none"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <a
            key={video.id}
            href={video.url}
            target="_blank"
            rel="noreferrer"
            className="bg-white shadow-xl rounded-xl overflow-hidden hover:scale-105 transition-transform border border-gray-200"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-44 object-cover"
            />
            <div className="p-3 text-left">
              <h3 className="font-semibold text-gray-800 hover:text-red-600">
                {video.title.length > 60
                  ? video.title.slice(0, 60) + "..."
                  : video.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {video.channelTitle}
              </p>
            </div>
          </a>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <p className="text-gray-500 mt-6">No matching videos found 😅</p>
      )}
    </div>
  );
};

export default YouTubeRecommender;
          