import React, { useState } from "react";
import { Header } from "../components/Header";
import Aurora from "../components/Background";
import { useEffect } from "react";

import Shuffle from "../components/Shuffle";
import { Play, RefreshCcw, TimerReset } from "lucide-react";

const BubbleSort = () => {
  const [array, setArray] = useState([]);

  const generateArray = (size  = Math.floor(Math.random() * 30)) => {
    const arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * 150) + 10);
    }
    setArray(arr);
  };

  useEffect(() => {
    generateArray();
  }, []);

  const maxValue = Math.max(...array, 1);

  const codeLines = [
    <>
      <span className="text-purple-400">for</span> i ={" "}
      <span className="text-yellow-400">0</span> to n-1{" "}
      <span className="text-purple-400">do</span>
    </>,
    <>
      <span className="text-purple-400">for</span> j ={" "}
      <span className="text-yellow-400">0</span> to n-i-2{" "}
      <span className="text-purple-400">do</span>
    </>,
    <>
      <span className="text-purple-400">if</span> arr[j] &gt; arr[j+1]{" "}
      <span className="text-purple-400">then</span>
    </>,
    <span className="text-blue-400">swap(arr[j], arr[j+1])</span>,
    <span className="text-purple-400">end if</span>,
    <span className="text-purple-400">end for</span>,
    <span className="text-purple-400">end for</span>,
  ];

  return (
    <div className="relative min-h-screen overflow-hidden font-sans pb-10">
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
          <div className="text-emerald-500">
            <span className="text-gray-400">Home /</span> BubbleSort{" "}
          </div>

          <div className="flex justify-between pt-3 ">
            <span className="font-semibold text-4xl">
              Bubble<span className="text-gray-400">Sort</span>
            </span>

            <div className="flex gap-3">
              <div className="border border-yellow-400/40 text-yellow-400 text-sm rounded-md flex justify-center place-items-center px-4 h-7 bg-white/5">
                0(n²) Time
              </div>
              <div className="border border-blue-400/40 text-blue-400 text-sm rounded-md flex justify-center place-items-center px-4 h-7 bg-white/5">
                0(1) Space
              </div>
              <div className="border border-green-400/40 text-green-400 text-sm rounded-md flex justify-center place-items-center px-4 h-7 bg-white/5">
                Stable
              </div>
            </div>
          </div>

          <div className="border border-white/10 bg-white/5  rounded-2xl mt-8 py-6 px-6 mb-4">
            <span className="text-white/30 text-sm">// VISUALIZATION </span>
            <div className="h-10 mt-5 flex text-sm gap-3">
              <div className="border border-white/10 h-10 bg-white/5  rounded-xl w-[80%]"></div>
              <button className="h-10 bg-white/5 border border-white/10 flex justify-center place-items-center px-4 rounded-xl w-[10%] gap-2">
                <RefreshCcw size={15} /> Load
              </button>
              <button
                onClick={() => generateArray()}
                className="h-10 bg-white/5 border border-white/10 flex justify-center place-items-center px-4 rounded-xl w-[10%] gap-2"
              >
                {" "}
                Random
              </button>
            </div>

            <div className="w-full h-60 mt-4 flex items-end justify-center gap-1 px-2">
              {array.map((value, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-end h-full transition-all duration-300"
                  style={{
                    width: `${100 / array.length}%`,
                  }}
                >
                  {/* Value Text */}
                  <span className="text-[10px] text-white mb-1">{value}</span>

                  {/* Bar */}
                  <div
                    className="w-full bg-emerald-400 rounded-t-md transition-all duration-300"
                    style={{
                      height: `${(value / maxValue) * 100}%`,
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-3">
              <button className="h-10 bg-green-400/5 border border-green-400/40 text-green-400 flex justify-center place-items-center px-4 rounded-xl w-[10%] gap-2">
                <Play size={15} /> Play
              </button>
              <button className="h-10 bg-red-400/5 border border-red-400/40 text-red-400 flex  justify-center place-items-center px-4 rounded-xl w-[10%] gap-2">
                <TimerReset size={15} /> Reset
              </button>
            </div>
          </div>

          <div className="w-full flex gap-4 ">
            <div className="h-55 w-[50%] border border-white/10 bg-white/5 rounded-xl p-4 pb-6 font-semibold">
              <span className="text-emerald-500 text-sm">// STATISTICS</span>

              <div className="flex flex-wrap h-full w-full gap-3 justify-center p-3">
                <div className="w-[45%] h-[45%] border border-white/10 bg-white/5 rounded-xl"></div>
                <div className="w-[45%] h-[45%] border border-white/10 bg-white/5 rounded-xl"></div>
                <div className="w-[45%] h-[45%] border border-white/10 bg-white/5 rounded-xl"></div>
                <div className="w-[45%] h-[45%] border border-white/10 bg-white/5 rounded-xl"></div>
              </div>
            </div>

            <div className=" w-[50%] border border-white/10 bg-white/5 rounded-xl p-4 font-semibold">
              <span className="text-emerald-500 text-sm">// PSEUDOCODE </span>
              <div className="max-w-2xl mx-auto mt-10 rounded-2xl overflow-hidden shadow-xl bg-transparent border border-gray-800">
                <div className="flex font-mono text-sm text-gray-200">
                  {/* Line Numbers */}
                  <div className="bg-gray-900/60 text-gray-500 px-4 py-5 select-none text-right">
                    {codeLines.map((_, index) => (
                      <div key={index} className="leading-7">
                        {index + 1}
                      </div>
                    ))}
                  </div>

                  {/* Code Content */}
                  <div className="px-6 py-5 flex-1">
                    {codeLines.map((line, index) => (
                      <div
                        key={index}
                        className={`leading-7 ${
                          index === 1
                            ? "pl-6"
                            : index === 2
                              ? "pl-12"
                              : index === 3
                                ? "pl-16"
                                : index === 4
                                  ? "pl-12"
                                  : index === 5
                                    ? "pl-6"
                                    : ""
                        }`}
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BubbleSort;
