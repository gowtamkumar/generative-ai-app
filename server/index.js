import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// const openai = new OpenAI({ apiKey: process.env.HF_API_KEY });

// Route for text generation (ChatGPT)
app.post("/", async (req, res) => {
  res.json({ status: 201, message: "Welcome to node.js server" });
  console.log("Welcome to node.js server");
});

export async function queryHuggingFace(data) {
  const response = await fetch(
    "https://router.huggingface.co/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Hugging Face API Error ${response.status}: ${text}`);
  }

  const result = await response.json();
  return result;
}

// Route for text generation (ChatGPT)
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message is required" });
    }

    const data = {
      model: "openai/gpt-oss-120b:cerebras", // Hugging Face chat model
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ],
    };

    // Await response directly
    const response = await queryHuggingFace(data);

    // Safely access content
    const reply =
      response.choices?.[0]?.message?.content || "No response from model";

    res.status(200).json({ reply });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Route for image generation (DALL·E)
// app.post("/image", async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     const image = await openai.images.generate({
//       model: "gpt-image-1",
//       prompt,
//     });

//     res.json({ url: image.data[0].url });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
