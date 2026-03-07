import React, { useState } from "react";
import { Bot, Send, X } from "lucide-react";

const ASKAI = () => {
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleAsk = () => {
    if (!aiQuestion) return;
    askAI();
    setAiQuestion("");
  };

  const askAI = async () => {
    setAiLoading(true);
    setAiAnswer("");

    try {
      const res = await fetch(
        "https://algorithm-analyzer-fu1s.onrender.com/api/ask-ai",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: aiQuestion }),
        }
      );

      const data = await res.json()
      setAiAnswer(data.answer);
    } catch (err) {
      setAiAnswer("Something went wrong.");
    }

    setAiLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="
        fixed bottom-6 right-6 z-50
        w-14 h-14
        flex items-center justify-center
        rounded-full
        bg-gradient-to-r from-purple-500 to-cyan-400
        text-white
        shadow-lg
        hover:scale-105
        transition
        "
      >
        <Bot size={22} />
      </button>

      {/* Floating Panel */}
      {open && (
        <div
          className="
          fixed bottom-24 right-6 z-50
          w-[360px] max-h-[500px]
          border border-white/10
          bg-[#020617]/90
          backdrop-blur-xl
          rounded-2xl
          shadow-2xl
          flex flex-col
          overflow-hidden
        "
        >
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-white/10">
            <span className="text-sm text-emerald-400 font-medium">
              AI Algorithm Assistant
            </span>

            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm">

            {/* User Question */}
            {aiQuestion && !aiLoading && (
              <div className="flex justify-end">
                <div className="bg-purple-500/20 border border-purple-400/30 px-3 py-2 rounded-lg text-white max-w-[80%]">
                  {aiQuestion}
                </div>
              </div>
            )}

            {/* AI Answer */}
            {aiLoading && (
              <div className="text-gray-400 text-sm">Thinking...</div>
            )}

            {aiAnswer && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 px-3 py-2 rounded-lg text-gray-300 max-w-[80%] whitespace-pre-wrap">
                  {aiAnswer}
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-white/10 p-3 flex gap-2">
            <input
              className="
              flex-1
              h-10
              bg-white/5
              border border-white/10
              rounded-lg
              px-3
              text-white
              text-sm
              outline-none
              placeholder:text-gray-500
              "
              placeholder="Ask about complexity..."
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAsk();
              }}
            />

            <button
              onClick={handleAsk}
              className="
              w-10 h-10
              flex items-center justify-center
              rounded-lg
              bg-purple-500/20
              border border-purple-400/40
              text-purple-400
              hover:bg-purple-500/30
              transition
              "
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ASKAI;