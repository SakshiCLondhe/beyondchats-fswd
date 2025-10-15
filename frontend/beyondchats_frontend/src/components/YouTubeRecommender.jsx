import React, { useState, useEffect } from "react";

const sampleVideos = [
  // 🌼 Class 1–3
  {
    id: "1",
    title: "Learn Alphabets and Phonics for Kids | A to Z Learning",
    channelTitle: "Pebbles Kids Learning",
    thumbnail: "https://img.youtube.com/vi/4x_G21KhcEo/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=4x_G21KhcEo",
    category: "Class 1–3",
  },
  {
    id: "2",
    title: "Basic Numbers for Kids | 1 to 100 Counting",
    channelTitle: "MagicBox Animation",
    thumbnail: "https://img.youtube.com/vi/DR-cfDsHCGA/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=DR-cfDsHCGA",
    category: "Class 1–3",
  },
  {
    id: "3",
    title: "Rhymes and Poems for Class 1 Kids",
    channelTitle: "Infobells Hindi",
    thumbnail: "https://img.youtube.com/vi/fR2TqXy1x6M/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=fR2TqXy1x6M",
    category: "Class 1–3",
  },

  // 📘 Class 4–6
  {
    id: "4",
    title: "NCERT Class 4 Science - Our Environment",
    channelTitle: "Learn With Fun",
    thumbnail: "https://img.youtube.com/vi/AtzYy4kY2bA/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=AtzYy4kY2bA",
    category: "Class 4–6",
  },
  {
    id: "5",
    title: "Class 5 EVS Chapter 1 - Super Senses | NCERT",
    channelTitle: "Vedantu Young Wonders",
    thumbnail: "https://img.youtube.com/vi/MjF1bG5LUcs/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=MjF1bG5LUcs",
    category: "Class 4–6",
  },
  {
    id: "6",
    title: "Class 6 Science Chapter 1 - Food: Where Does It Come From?",
    channelTitle: "Magnet Brains",
    thumbnail: "https://img.youtube.com/vi/5VnPBCa3kF0/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=5VnPBCa3kF0",
    category: "Class 4–6",
  },

  // 🔬 Class 7–8
  {
    id: "7",
    title: "Class 7 Science - Nutrition in Plants | NCERT",
    channelTitle: "Vedantu 9&10",
    thumbnail: "https://img.youtube.com/vi/ZRzZC9EV7mU/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=ZRzZC9EV7mU",
    category: "Class 7–8",
  },
  {
    id: "8",
    title: "Class 8 Science Chapter 1 - Crop Production and Management",
    channelTitle: "Magnet Brains",
    thumbnail: "https://img.youtube.com/vi/UZpOP2YJBFc/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=UZpOP2YJBFc",
    category: "Class 7–8",
  },
  {
    id: "9",
    title: "Class 8 Math Chapter 2 - Linear Equations in One Variable",
    channelTitle: "LearnoHub - Class 9 & 10",
    thumbnail: "https://img.youtube.com/vi/5bW8bH_q9E0/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=5bW8bH_q9E0",
    category: "Class 7–8",
  },

  // ⚗️ Class 9–10
  {
    id: "10",
    title: "Class 9 Physics - Motion | Full Chapter NCERT",
    channelTitle: "Magnet Brains",
    thumbnail: "https://img.youtube.com/vi/wjsb4U2W6nE/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=wjsb4U2W6nE",
    category: "Class 9–10",
  },
  {
    id: "11",
    title: "Class 10 Chemistry - Chemical Reactions and Equations",
    channelTitle: "ExamFear Education",
    thumbnail: "https://img.youtube.com/vi/ytXt3YIhAo0/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=ytXt3YIhAo0",
    category: "Class 9–10",
  },
  {
    id: "12",
    title: "Class 10 Maths - Trigonometry | Introduction",
    channelTitle: "Vedantu Class 9 & 10",
    thumbnail: "https://img.youtube.com/vi/oYf2k5_7eNs/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=oYf2k5_7eNs",
    category: "Class 9–10",
  },

  // 💻 Coding & Learning
  {
    id: "13",
    title: "Python for Absolute Beginners",
    channelTitle: "Programming with Mosh",
    thumbnail: "https://img.youtube.com/vi/_uQrJ0TkZlc/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
    category: "Coding & Learning",
  },
  {
    id: "14",
    title: "Learn HTML & CSS Full Course",
    channelTitle: "freeCodeCamp.org",
    thumbnail: "https://img.youtube.com/vi/mU6anWqZJcc/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=mU6anWqZJcc",
    category: "Coding & Learning",
  },
  {
    id: "15",
    title: "JavaScript Full Course for Beginners",
    channelTitle: "Bro Code",
    thumbnail: "https://img.youtube.com/vi/8dWL3wF_OMw/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=8dWL3wF_OMw",
    category: "Coding & Learning",
  },
  {
    id: "16",
    title: "React JS Crash Course 2025",
    channelTitle: "CodeWithHarry",
    thumbnail: "https://img.youtube.com/vi/w7ejDZ8SWv8/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
    category: "Coding & Learning",
  },
  {
    id: "17",
    title: "Understanding Artificial Intelligence | For Students",
    channelTitle: "TechSimplified",
    thumbnail: "https://img.youtube.com/vi/2ePf9rue1Ao/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=2ePf9rue1Ao",
    category: "Coding & Learning",
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

  // Group videos by category
  const categories = Array.from(
    new Set(filteredVideos.map((v) => v.category))
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-red-600 mb-4 drop-shadow-md text-start">
        YouTube Learning Hub 🎓
      </h2>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search topic (e.g. Physics, React, AI)..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full sm:w-2/3 p-3 border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-red-400 outline-none"
        />
      </div>

      {categories.map((category) => {
        const videos = filteredVideos.filter((v) => v.category === category);
        return (
          <div key={category} className="mb-10">
            <h3 className="text-2xl font-semibold mb-3 text-gray-800 border-l-4 border-red-500 pl-3">
              {category}
            </h3>
            <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-3">
              {videos.map((video) => (
                <a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="min-w-[280px] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-transform hover:scale-105 relative border border-gray-200 group"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-44 object-cover"
                  />

                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-80 bg-black bg-opacity-40 transition-opacity">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>

                  {/* Duration badge */}
                  <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    10:23
                  </span>

                  <div className="p-3">
                    <h4 className="font-semibold text-gray-800 hover:text-red-600">
                      {video.title.length > 60
                        ? video.title.slice(0, 60) + "..."
                        : video.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {video.channelTitle}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        );
      })}

      {filteredVideos.length === 0 && (
        <p className="text-gray-500 mt-6 text-center">
          No matching videos found 😅
        </p>
      )}
    </div>
  );
};

export default YouTubeRecommender;
