import React, { useState, useEffect, useRef } from "react";
import { Header } from "../components/Header";
import Aurora from "../components/Background";
import { Play, RefreshCcw, TimerReset } from "lucide-react";
import { binarysearch } from "../algorithms/binarysearch";

const BinarySearch = () => {
  const [array, setArray] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);
  const [target, setTarget] = useState("");

  const [isRunning, setIsRunning] = useState(false);
  const [activeIndices, setActiveIndices] = useState([]);
  const [foundIndex, setFoundIndex] = useState(null);

  const [range, setRange] = useState([0, array.length - 1]);
  const [midIndex, setMidIndex] = useState(null);

  const [lowIndex, setLowIndex] = useState(null);
  const [highIndex, setHighIndex] = useState(null);

  const [speed, setSpeed] = useState(500);
  const [comparisons, setComparisons] = useState(0);

  const [isPaused, setIsPaused] = useState(false);
  const pauseRef = useRef(false);

  const generateArray = (size = Math.floor(Math.random() * 30 + 5)) => {
    const arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * 150) + 10);
    }
    setArray(arr);
    setOriginalArray(arr);
    resetStates();
  };

  useEffect(() => {
    generateArray();
  }, []);

  const resetStates = () => {
    setActiveIndices([]);
    setFoundIndex(null);
    setComparisons(0);
  };

  const LoadOriginalArray = () => {
    setArray([...originalArray]);
    resetStates();
    setIsRunning(false);
  };

  const runBinarySearch = async () => {
    if (isRunning || target === "") return;

    setIsRunning(true);
    resetStates();

    const sortedArray = [...array].sort((a, b) => a - b);
    setArray(sortedArray);

    const { animations } = binarysearch(sortedArray, Number(target));

    for (let i = 0; i < animations.length; i++) {
      while (pauseRef.current) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      const animation = animations[i];
      const delayTime = 1020 - speed;

      if (animation.type === "range") {
        setLowIndex(animation.low);
        setHighIndex(animation.high);
        await new Promise((resolve) => setTimeout(resolve, delayTime));
      }

      if (animation.type === "mid") {
        setMidIndex(animation.index);
        await new Promise((resolve) => setTimeout(resolve, delayTime));
      }

      if (animation.type === "compare") {
        setActiveIndices([animation.index]);
        setComparisons((prev) => prev + 1);
        await new Promise((resolve) => setTimeout(resolve, delayTime));
      }

      if (animation.type === "found") {
        setFoundIndex(animation.index);
        break;
      }

      if (animation.type === "not-found") {
        break;
      }
    }
    setLowIndex(null);
    setHighIndex(null);
    setMidIndex(null);
    setActiveIndices([]);
    setMidIndex(null);
    setIsRunning(false);
  };

  const togglePause = () => {
    setIsPaused((prev) => {
      pauseRef.current = !prev;
      return !prev;
    });
  };

  const maxValue = Math.max(...array, 1);
  const codeLines = [
    <>
      <span className="text-purple-400">let</span> low ={" "}
      <span className="text-yellow-400">0</span>
    </>,
    <>
      <span className="text-purple-400">let</span> high = n -{" "}
      <span className="text-yellow-400">1</span>
    </>,
    <>
      <span className="text-purple-400">while</span> low ≤ high
    </>,
    <>
      mid = (low + high) / <span className="text-yellow-400">2</span>
    </>,
    <>
      <span className="text-purple-400">if</span> arr[mid] == target
    </>,
    <>
      <span className="text-purple-400">return</span> mid
    </>,
    <>
      <span className="text-purple-400">else if</span> arr[mid] &lt; target
    </>,
    <>
      low = mid + <span className="text-yellow-400">1</span>
    </>,
    <>
      <span className="text-purple-400">else</span>
    </>,
    <>
      high = mid - <span className="text-yellow-400">1</span>
    </>,
    <>
      <span className="text-purple-400">return</span> -1
    </>,
  ];

  return (
    <div className="relative min-h-screen overflow-hidden font-sans pb-10">
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
        className="fixed inset-0 -z-10"
      />

      <div className="flex justify-center">
        <Header />
      </div>

      <div className="mt-20 w-full flex justify-center place-items-center text-white">
        <section className="w-[80%]">
          {/* BreadCrumb */}
          <div className="text-emerald-500">
            <span className="text-gray-400">Home /</span> BinarySearch
          </div>

          <div className="flex justify-between pt-3 ">
            <span className="font-semibold text-4xl">
              Binary<span className="text-gray-400">Search</span>
            </span>

            <div className="flex gap-3">
              <div className="border border-yellow-400/40 text-yellow-400 text-sm rounded-md flex justify-center place-items-center px-4 h-7 bg-white/5">
                O(log n) Time
              </div>
              <div className="border border-blue-400/40 text-blue-400 text-sm rounded-md flex justify-center place-items-center px-4 h-7 bg-white/5">
                O(1) Space
              </div>
              <div className="border border-green-400/40 text-green-400 text-sm rounded-md flex justify-center place-items-center px-4 h-7 bg-white/5">
                Stable
              </div>
            </div>
          </div>

          {/* Visualization */}
          <div className="border border-white/10 bg-white/5 rounded-2xl mt-8 py-6 px-6 mb-4">
            <span className="text-white/30 text-sm">// VISUALIZATION </span>

            <div className="h-10 mt-5 flex text-sm gap-3">
              <input
                className="border border-white/10 h-10 bg-white/5 rounded-xl w-[60%] px-3"
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

              <input
                className="border border-white/10 h-10 bg-white/5 rounded-xl w-[15%] px-3"
                placeholder="Target"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                disabled={isRunning}
              />

              {/* Load Button */}
              <button
                onClick={LoadOriginalArray}
                disabled={isRunning}
                className="h-10 bg-white/5 border border-white/10 flex justify-center place-items-center px-4 rounded-xl w-[10%] gap-2"
              >
                <RefreshCcw size={15} /> Load
              </button>

              {/* Random Button */}
              <button
                onClick={() => generateArray()}
                disabled={isRunning}
                className="h-10 bg-white/5 border border-white/10 flex justify-center place-items-center px-4 rounded-xl w-[10%] gap-2"
              >
                Random
              </button>
            </div>
            {/* Bars */}
            <div className="w-full h-60 mt-4 flex items-end justify-center gap-1 px-2 overflow-hidden">
              {array.map((value, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-end h-full transition-all duration-300"
                  style={{ width: `${100 / array.length}%` }}
                >
                  <span className="text-[10px] text-white mb-1">{value}</span>

                  <div
                    className={`w-full rounded-t-md transition-all duration-300 ${
                      index === foundIndex
                        ? "bg-pink-400"
                        : index === midIndex
                          ? "bg-purple-400"
                          : index === lowIndex
                            ? "bg-blue-400"
                            : index === highIndex
                              ? "bg-orange-400"
                              : activeIndices.includes(index)
                                ? "bg-red-400"
                                : index < lowIndex || index > highIndex
                                  ? "bg-gray-700"
                                  : "bg-emerald-400"
                    }`}
                    style={{
                      height: `${(value / maxValue) * 100}%`,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-3 justify-between">
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => {
                    if (!isRunning) runBinarySearch();
                    else togglePause();
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
                  className="h-10 bg-red-400/5 border border-red-400/40 text-red-400 flex justify-center place-items-center px-4 rounded-xl w-[10%] gap-2"
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
                />
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="w-full flex gap-4 ">
            <div className="w-[50%] border border-white/10 bg-white/5 rounded-xl p-4">
              <span className="text-emerald-500 text-sm">// STATISTICS</span>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="rounded-xl border border-blue-400/30 bg-blue-400/5 p-4 text-center">
                  <p className="text-gray-400 text-sm">Comparisons</p>
                  <p className="text-2xl font-semibold text-blue-400">
                    {comparisons}
                  </p>
                </div>

                <div className="rounded-xl border border-green-400/30 bg-green-400/5 p-4 text-center">
                  <p className="text-gray-400 text-sm">Time Complexity</p>
                  <p className="text-2xl font-semibold text-green-400">
                    O(log n)
                  </p>
                </div>
              </div>
            </div>

            <div className="w-[50%] border border-white/10 bg-white/5 rounded-xl p-4 font-semibold">
              <span className="text-emerald-500 text-sm">// PSEUDOCODE </span>
              <div className="mt-6 font-mono text-sm">
                {codeLines.map((line, index) => (
                  <div key={index} className="leading-7">
                    {index + 1}. {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BinarySearch;
