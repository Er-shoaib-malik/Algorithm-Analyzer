import React from "react";
import { Header } from "../components/Header";
import Aurora from "../components/Background";
import BlurTextLocked from "../components/BlurTextLocked";
import Button from "../components/Button";
import MagicBento from "../components/MagicBento";
import Shuffle from "../components/Shuffle";
import { useState } from "react";

const Homepage = () => {
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);


  const askAI = async () => {
  if (!aiQuestion) return;

  setAiLoading(true);
  setAiAnswer("");

  try {
    const res = await fetch("http://localhost:5000/api/ask-ai", {
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
    <div className="relative min-h-screen overflow-hidden">
      {/* Aurora Background */}
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
        className="fixed inset-0 -z-10"
      />

      {/* Content */}
      <section>
        <div className="flex justify-center">
          <Header />
        </div>

        <main className="flex flex-col gap-10 items-center justify-center h-[70vh] text-white mt-10">
          <BlurTextLocked text="Turn Algorithms into Something you can see.[br]Analyze Time, Space, and Execution [br]step by step with interactive visualizations." />
          <Button />
        </main>
      </section>

      <div className="w-full border border-white/10 bg-white/5 rounded-xl p-4 mt-6">
        <span className="text-emerald-500 text-sm">// AI EXPLAINER</span>

        <div className="flex gap-3 mt-4">
          <input
            className="border border-white/10 h-10 bg-white/5 rounded-xl w-[80%] px-3"
            placeholder="Ask about complexity, best case, worst case..."
            value={aiQuestion}
            onChange={(e) => setAiQuestion(e.target.value)}
          />

          <button
            onClick={askAI}
            className="h-10 bg-purple-400/5 border border-purple-400/40 text-purple-400 px-4 rounded-xl"
          >
            Ask AI
          </button>
        </div>

        <div className="mt-4 text-sm text-gray-300 whitespace-pre-wrap">
          {aiLoading ? "Thinking..." : aiAnswer}
        </div>
      </div>

      <section
        id="Algorithm"
        className="flex flex-col items-center justify-center mt-10 h-screen"
      >
        <Shuffle
          text="SELECT ALGORITHM"
          shuffleDirection="right"
          duration={0.35}
          animationMode="evenodd"
          shuffleTimes={1}
          ease="power3.out"
          stagger={0.03}
          threshold={0.1}
          triggerOnce={true}
          triggerOnHover
          respectReducedMotion={true}
          loop={true}
          loopDelay={1}
          className="Poppins font-bold text-white/30 "
        />
        <MagicBento
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="132, 0, 255"
        />
      </section>
    </div>
  );
};

export default Homepage;
