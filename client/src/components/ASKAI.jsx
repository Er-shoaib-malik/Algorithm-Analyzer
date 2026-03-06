import React, { useState } from "react";

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
    if (!aiQuestion) return;

    setAiLoading(true);
    setAiAnswer("");

    try {
      const res = await fetch("https://algorithm-analyzer-fu1s.onrender.com/api/ask-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: aiQuestion }),
      });

      const data = await res.json();
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
        className="fixed bottom-6 right-6 z-50 bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-full shadow-lg"
      >
        🤖 AI
      </button>

      {/* Floating Panel */}
      {open && (
        <div className="fixed bottom-20 right-6 w-[350px] z-50 border border-white/10 bg-[#020617] backdrop-blur-md rounded-xl p-4 shadow-2xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-emerald-500 text-sm">// AI EXPLAINER</span>

            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-white text-sm"
            >
              ✕
            </button>
          </div>

          <div className="flex gap-3 mt-3">
            <input
              className="border border-white/10 h-10 bg-white/5 rounded-xl w-[80%] px-3 text-white text-sm"
              placeholder="Ask about complexity..."
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAsk();
                }
              }}
            />

            <button
              onClick={handleAsk}
              className="h-10 bg-purple-400/5 border border-purple-400/40 text-purple-400 px-3 rounded-xl text-sm"
            >
              Ask
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-300 whitespace-pre-wrap max-h-[200px] overflow-y-auto">
            {aiLoading ? "Thinking..." : aiAnswer}
          </div>
        </div>
      )}
    </>
  );
};

export default ASKAI;
