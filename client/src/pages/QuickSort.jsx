import React, { useState } from "react";
import { Header } from "../components/Header";
import Aurora from "../components/Background";
import { useEffect } from "react";
import { Play, RefreshCcw, TimerReset } from "lucide-react";
import { quicksort } from "../algorithms/QuickSort";
import { useAsyncError } from "react-router-dom";
import { useRef } from "react";

const QuickSort = () => {
  const [array, setArray] = useState([]);

  const generateArray = (size = Math.floor(Math.random() * 30 + 5)) => {
    const arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * 150) + 10);
    }
    setArray(arr);
    setOriginalArray(arr);
  };

  useEffect(() => {
    generateArray();
  }, []);

  // implement Quicksort working on bars

  const [isRunning, setIsRunning] = useState(false);
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [speed, setSpeed] = useState(100);
  const [compares, setCompares] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [originalArray, setOriginalArray] = useState([]);
  const [pass, setPass] = useState(0);
  const [isSortedArray, setIsSortedArray] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const pauseRef = useRef(false);
  const [pivotIndex, setPivotIndex] = useState(null);

  const LoadOriginalArray = () => {
    setArray([...originalArray]);
    setSortedIndices([]);
    setActiveIndices([]);
    setCompares(0);
    setSwaps(0);
    setPass(0);
    setIsSortedArray(false);
  };

  const runQuicksort = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setSortedIndices([]);
    setCompares(0);
    setSwaps(0);
    setIsSortedArray(false);

    const { animations } = quicksort(array);
    let newArray = [...array];

    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];

      // Pause support
      while (pauseRef.current) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      const delayTime = 1050 - speed;

      if (animation.type === "pivot") {
        setPivotIndex(animation.index);
      }

      if (animation.type === "compare") {
        setActiveIndices(animation.indices);
        setCompares((prev) => prev + 1);
        await new Promise((resolve) => setTimeout(resolve, delayTime));
      }

      if (animation.type === "swap") {
        const [a, b] = animation.indices;
        [newArray[a], newArray[b]] = [newArray[b], newArray[a]];
        setArray([...newArray]);
        setSwaps((prev) => prev + 1);
        await new Promise((resolve) => setTimeout(resolve, delayTime));
      }

      if (animation.type === "sorted") {
        setSortedIndices((prev) => [...prev, animation.index]);
      }

      setActiveIndices([]);
    }

    setPivotIndex(null);
    setSortedIndices([...Array(array.length).keys()]);
    setIsSortedArray(true);
    setIsRunning(false);
  };

  const maxValue = Math.max(...array, 1);

  const codeLines = [
    <>
      <span className="text-purple-400">function</span>{" "}
      <span className="text-blue-400">quickSort</span>(arr, low, high)
    </>,
    <>
      <span className="text-purple-400">if</span> low &lt; high
    </>,
    <>
      pi = <span className="text-blue-400">partition</span>(arr, low, high)
    </>,
    <>quickSort(arr, low, pi - 1)</>,
    <>quickSort(arr, pi + 1, high)</>,
    <>
      <span className="text-purple-400">end if</span>
    </>,
    <>
      <span className="text-purple-400">function</span>{" "}
      <span className="text-blue-400">partition</span>(arr, low, high)
    </>,
    <>pivot = arr[low]</>,
    <>
      <span className="text-purple-400">while</span> i &lt; j
    </>,
    <>swap(arr[i], arr[j])</>,
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
            <span className="text-gray-400">Home /</span> QuickSort{" "}
          </div>

          <div className="flex justify-between pt-3 ">
            <span className="font-semibold text-4xl">
              Quick<span className="text-gray-400">Sort</span>
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
              <input
                className="border border-white/10 h-10 bg-white/5  rounded-xl w-[80%] px-3"
                type="text"
                value={array.join(" , ")}
                disabled={isRunning}
                onChange={(e) => {
                  const value = e.target.value;

                  const newArray = value
                    .split(",")
                    .map((num) => Number(num.trim()))
                    .filter((num) => !isNaN(num));

                  setArray(newArray);
                }}
              />

              <button
                onClick={LoadOriginalArray}
                disabled={isRunning}
                className="h-10 border flex justify-center place-items-center px-4 rounded-xl w-[10%] gap-2 cursor-pointer bg-cyan-400/5 border-cyan-400/40 text-cyan-400"
              >
                <RefreshCcw size={15} /> Load
              </button>
              <button
                onClick={() => generateArray()}
                disabled={isRunning}
                className="h-10 border flex justify-center place-items-center px-4 rounded-xl w-[10%] gap-2 cursor-pointer bg-green-400/5 border-green-400/40 text-green-400"
              >
                {" "}
                Random
              </button>
            </div>

            <div className="w-full h-60 mt-4 flex items-end justify-center gap-1 px-2 overflow-hidden">
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
                    className={`w-full rounded-t-md transition-all duration-300 ${
                      sortedIndices.includes(index)
                        ? "bg-yellow-400"
                        : index === pivotIndex
                          ? "bg-purple-400"
                          : activeIndices.includes(index)
                            ? "bg-red-400"
                            : "bg-emerald-400"
                    }`}
                    style={{
                      height: `${(value / maxValue) * 100}%`,
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-3 justify-between">
              <div className="flex gap-3 mt-3 w-full">
                <button
                  onClick={() => {
                    if (!isRunning) {
                      runQuicksort();
                    } else {
                      setIsPaused((prev) => {
                        pauseRef.current = !prev;
                        return !prev;
                      });
                    }
                  }}
                  className={`h-10 px-4 rounded-xl w-[10%] gap-2 flex justify-center items-center border ${
                    isRunning
                      ? "bg-yellow-400/5 border-yellow-400/40 text-yellow-400"
                      : "bg-green-400/5 border-green-400/40 text-green-400"
                  }`}
                >
                  <Play size={15} />
                  {isRunning ? (isPaused ? "Resume" : "Pause") : "Play"}
                </button>

                <button
                  onClick={LoadOriginalArray}
                  disabled={isRunning}
                  className="h-10 bg-red-400/5 border border-red-400/40 text-red-400 flex  justify-center place-items-center px-4 rounded-xl w-[10%] gap-2"
                >
                  <TimerReset size={15} /> Reset
                </button>
              </div>

              <div className="flex justify-center gap-2">
                <span className="text-gray-400 text-sm flex place-items-center">
                  Speed
                </span>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="text-blue-400"
                />
                <span className="text-gray-400 text-sm flex place-items-center">
                  {" "}
                  {Math.floor((speed / 10000) * 100)}x
                </span>
              </div>
            </div>
          </div>

          <div className="w-full flex gap-4 ">
            <div className="w-[50%] border border-white/10 bg-white/5 rounded-xl p-4">
              <span className="text-emerald-500 text-sm">// STATISTICS</span>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="rounded-xl border border-blue-400/30 bg-blue-400/5 p-4 text-center">
                  <p className="text-gray-400 text-sm">Comparisons</p>
                  <p className="text-2xl font-semibold text-blue-400">
                    {compares}
                  </p>
                </div>

                <div className="rounded-xl border border-purple-400/30 bg-purple-400/5 p-4 text-center">
                  <p className="text-gray-400 text-sm">Shifts</p>
                  <p className="text-2xl font-semibold text-purple-400">
                    {swaps}
                  </p>
                </div>

                <div className="rounded-xl border border-yellow-400/30 bg-yellow-400/5 p-4 text-center">
                  <p className="text-gray-400 text-sm">Best Case</p>
                  <p className="text-2xl font-semibold text-yellow-400">O(n)</p>
                </div>

                <div className="rounded-xl border border-orange-400/30 bg-orange-400/5 p-4 text-center">
                  <p className="text-gray-400 text-sm">Average Case</p>
                  <p className="text-2xl font-semibold text-orange-400">
                    O(n²)
                  </p>
                </div>

                <div className="rounded-xl border border-red-400/30 bg-red-400/5 p-4 text-center">
                  <p className="text-gray-400 text-sm">Worst Case</p>
                  <p className="text-2xl font-semibold text-red-400">O(n²)</p>
                </div>

                <div className="rounded-xl border border-green-400/30 bg-green-400/5 p-4 text-center">
                  <p className="text-gray-400 text-sm">Space Complexity</p>
                  <p className="text-2xl font-semibold text-green-400">O(1)</p>
                </div>
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

export default QuickSort;
