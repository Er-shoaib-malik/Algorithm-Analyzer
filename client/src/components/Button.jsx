import React from "react";
const Button = () => {
  const handleScroll = () => {
    const section = document.getElementById("Algorithm");
    section?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <button
      onClick={handleScroll}
        className="group relative mt-15 px-10 py-4 rounded-full font-bold text-white
  border border-white/20
  bg-white/5 backdrop-blur-lg
  transition-all duration-300 ease-out
  hover:bg-white/70 hover:text-black
  hover:scale-105 hover:-translate-y-1
  active:scale-95"
      >
        {/* Glow ring */}
        <span
          className="absolute inset-0 rounded-full
    ring-1 ring-white/20
    group-hover:ring-white/40
    transition-all duration-300"
        />

        {/* Glossy sweep */}
        <span className="pointer-events-none absolute inset-0 rounded-full overflow-hidden">
          <span
            className="absolute -left-1/2 top-0 h-full w-1/2
      bg-gradient-to-r from-white/0 via-white/40 to-white/0
      skew-x-12
      translate-x-[-100%]
      group-hover:translate-x-[200%]
      transition-transform duration-700 ease-out"
          />
        </span>

        {/* Text */}
        <span className="relative z-10">Let&apos;s Analyze</span>
      </button>
    </div>
  );
};

export default Button;
