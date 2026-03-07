import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import "./App.css";
import BubbleSort from "./pages/BubbleSort";
import InsertionSort from "./pages/InsertionSort";
import MergeSort from "./pages/MergeSort" ;
import QuickSort from "./pages/QuickSort" ;
import LinearSearch from "./pages/LinearSearch";
import BinarySearch from "./pages/BinarySearch";
import ASKAI from "./components/ASKAI";
import CTAFooter from "./components/Ctafooter";

// Lazy load pages
const Homepage = lazy(() => import("./pages/Homepage"));

function App() {
  return (
    <div className="poppins-regular">
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<><Homepage />\ <CTAFooter/></>} />
            <Route path="/sorting/merge-sort" element={<><MergeSort /> <ASKAI/> <CTAFooter/></>} />
            <Route path="/sorting/bubble-sort" element={<><BubbleSort/> <ASKAI/> <CTAFooter/></>} />
            <Route path="/sorting/insertion-sort" element={<><InsertionSort/> <ASKAI/> <CTAFooter/></>} />
            <Route path="/sorting/quick-sort" element={<><QuickSort /> <ASKAI/> <CTAFooter/> </>} />
            <Route path="/searching/binary-search" element={<><BinarySearch /> <ASKAI/> <CTAFooter/> </>} />
            <Route path="/searching/linear-search" element={<><LinearSearch /> <ASKAI/> <CTAFooter/> </>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
