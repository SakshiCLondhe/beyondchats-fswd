// routes/videos.js
import express from "express";
import axios from "axios";

const router = express.Router();

// GET /api/videos?topic=Physics
router.get("/", async (req, res) => {
  const { topic } = req.query;

  try {
    // Example: fetch from YouTube API
    const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        key: process.env.YOUTUBE_API_KEY,
        q: topic,
        part: "snippet",
        maxResults: 6,
        type: "video"
      }
    });

    const videos = response.data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url
    }));

    res.json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch videos" });
  }
});

export default router;
