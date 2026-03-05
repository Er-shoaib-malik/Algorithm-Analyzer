require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/ask-ai", async (req, res) => {
  try {
    const { question } = req.body;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `You are an algorithm tutor. Keep answers short and clear.\n\n${question}`,
              },
            ],
          },
        ],
      },
    );

    const text = response.data.candidates[0].content.parts[0].text;

    res.json({ answer: text });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "AI error" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
