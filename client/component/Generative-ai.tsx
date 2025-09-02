/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import axios from "axios";
import { Key, useEffect, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function ChatGPTWithCode() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null) as any

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev: any) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/chat", { message: input });
      const aiMessage = { role: "ai", content: res.data.reply || "" };
      setMessages((prev: any) => [...prev, aiMessage]);
    } catch (err: any) {
      const errorMessage = { role: "ai", content: "Error: " + err.message };
      setMessages((prev: any) => [...prev, errorMessage]);
    }

    setLoading(false);
  };

  // Helper to render messages with code blocks
  const renderMessage = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g); // split code blocks
    return parts.map((part: any, idx) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        const code = part.replace(/```/g, "");
        return (
          <SyntaxHighlighter
            key={idx}
            language="javascript"
            style={atomDark}
            customStyle={{ borderRadius: "8px", padding: "10px", margin: "5px 0" }}
          >
            {code}
          </SyntaxHighlighter>
        );
      } else {
        return <span key={idx}>{part}</span>;
      }
    });
  };

  return (
    <div className=" max-w-6xl mx-auto flex flex-col h-screen bg-gray-50">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg: { role: string; content: any; }, idx: Key | null | undefined) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg ${msg.role === "user"
                ? "bg-blue-500 text-white rounded-br-none"
                : "bg-gray-200 text-gray-900 rounded-bl-none"
                }`}
            >
              {renderMessage(msg.content)}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-300 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default ChatGPTWithCode;
