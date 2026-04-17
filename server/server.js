import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const upload = multer();

app.use(cors());

const PREDICTION_KEY = process.env.AZURE_PREDICTION_KEY;
const PREDICTION_URL = process.env.AZURE_ENDPOINT;

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.post("/detect", upload.single("image"), async (req, res) => {
  try {
    if (!PREDICTION_KEY || !PREDICTION_URL) {
      return res.status(500).json({
        error: "Missing Azure environment variables.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: "No image uploaded.",
      });
    }

    const response = await fetch(PREDICTION_URL, {
      method: "POST",
      headers: {
        "Prediction-Key": PREDICTION_KEY,
        "Content-Type": "application/octet-stream",
      },
      body: req.file.buffer,
    });

    const data = await response.json();
    console.log("Azure predictions:", data.predictions);

    if (!response.ok) {
      return res.status(response.status).json({
        error: data,
      });
    }

    const ingredients = [
      ...new Set(
        (data.predictions || [])
          .filter((p) => p.probability > 0.2)
          .sort((a, b) => b.probability - a.probability)
          .map((p) => p.tagName)
      ),
    ];

    console.log("Filtered ingredients:", ingredients);

    res.json({ ingredients, raw: data.predictions || [] });
  } catch (err) {
    console.error("Detect error:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});