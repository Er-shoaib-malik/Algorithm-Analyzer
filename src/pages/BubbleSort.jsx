import React, { useState } from "react";
import { Header } from "../components/Header";
import Aurora from "../components/Background";

import Shuffle from "../components/Shuffle";

const BubbleSort = () => {
  const [array, setArray] = useState([]);

  const generateArray = (size = 30) => {
    const arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * 300) + 10);
    }
    setArray(arr);
  };

  return (
    <div className="relative min-h-screen overflow-hidden font-sans ">
      {/* Aurora Background */}
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
        className="fixed inset-0 -z-10"
      />

      {/* Content */}
      <div className="flex justify-center">
        <Header />
      </div>

      <div className="mt-20 w-full flex justify-center place-items-center text-white">
        <section className="w-[80%]">
          {/* BreadCrumb */}
          <div className="text-emerald-500"><span className="text-gray-400">Home /</span> BubbleSort </div>

          <div className="flex justify-between pt-3 ">
            <span className="font-semibold text-4xl">Bubble<span className="text-gray-400">Sort</span></span>

            <div className="flex gap-3">
              <div className="border border-yellow-400 text-yellow-400 text-sm rounded-md flex place-items-center px-4 h-7 bg-white/5">0(n²) Time</div>
              <div className="border border-blue-400 text-blue-400 text-sm rounded-md flex place-items-center px-4 h-7 bg-white/5">0(1) Space</div>
              <div className="border border-green-400 text-green-400 text-sm rounded-md flex place-items-center px-4 h-7 bg-white/5">Stable</div>
            </div>
          </div>

          <div className="border border-white/10 bg-white/5 h-102 rounded-2xl mt-8 py-6 px-6">
            <span className="text-white/30 text-sm">// VISUALIZATION </span>
            <div className="h-10 mt-5">
                <div className="border border-white/10 h-10 bg-white/5  rounded-xl w-[75%]"></div>
                <button>Load</button>
                <button>Random</button>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
};

export default BubbleSort;
