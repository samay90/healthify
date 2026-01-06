import express from "express";
import { analyzeFoodImage } from "./agent.js";

const app = express();
app.use(express.json());

app.post("/api/analyze-food", async (req, res) => {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({
      error: true,
      message: "imageUrl is required"
    });
  }

  try {
    const result = await analyzeFoodImage(imageUrl);

    const parsed = JSON.parse(result);

    return res.json(parsed);
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err?.message || "Failed to analyze image"
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
