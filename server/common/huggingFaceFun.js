export async function queryHuggingFace(data) {
  console.log("process.env.HF_API_KEY", process.env.HF_API_KEY);

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
