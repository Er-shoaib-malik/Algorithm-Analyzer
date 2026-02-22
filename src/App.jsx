import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import "./App.css";
import BubbleSort from "./pages/BubbleSort";

// Lazy load pages
const Homepage = lazy(() => import("./pages/Homepage"));

function App() {
  return (
    <div className="poppins-regular">
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/sorting/merge-sort" element={<Homepage />} />
            <Route path="/sorting/bubble-sort" element={<BubbleSort/>} />
            <Route path="/" element={<Homepage />} />
            <Route path="/" element={<Homepage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
