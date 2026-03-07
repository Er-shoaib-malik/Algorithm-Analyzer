import React from "react";

const CTAFooter = () => {
  return (
    <>
      {/* CTA SECTION */}
      <section className="w-full flex flex-col items-center justify-center py-32 px-6 text-center">

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Start learning
          <span className="text-gray-400 block">visually.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 mt-6 max-w-xl text-sm md:text-base">
          Join 12,000+ developers who learn algorithms through AlgorithmViz.
        </p>

        {/* Email Form */}
        <div className="mt-10 flex flex-col sm:flex-row w-full max-w-xl">

          <input
            type="email"
            placeholder="your@email.com"
            className="
              flex-1
              h-12
              px-4
              bg-white/5
              border border-white/10
              text-white
              rounded-l-lg
              outline-none
              placeholder:text-gray-500
            "
          />

          <button
            className="
              h-12
              px-8
              bg-cyan-400
              text-black
              font-semibold
              rounded-r-lg
              hover:bg-cyan-300
              transition
            "
          >
            GET EARLY ACCESS
          </button>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 px-6">

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <div className="text-xl font-bold text-white">
            Algorithm<span className="text-gray-400">Viz</span>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-gray-400 text-sm">

            <a href="#Algorithm" className="hover:text-white transition">
              Algorithms
            </a>

            <a href="#" className="hover:text-white transition">
              Documentation
            </a>

            <a
              href="https://github.com"
              className="hover:text-white transition"
            >
              GitHub
            </a>

            <a href="#" className="hover:text-white transition">
              Blog
            </a>

          </div>

          {/* Copyright */}
          <div className="text-gray-500 text-sm">
            © 2026 AlgorithmViz
          </div>

        </div>

      </footer>
    </>
  );
};

export default CTAFooter;