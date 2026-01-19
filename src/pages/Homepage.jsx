import React from "react";
import { Header } from "../components/Header";
import Aurora from "../components/Background";
import BlurTextLocked from "../components/BlurTextLocked";
import Button from "../components/Button";
import MagicBento from "../components/MagicBento";
import Shuffle from "../components/Shuffle";

const Homepage = () => {
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
