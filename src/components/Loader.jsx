import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="w-14 h-14 rounded-full border-4 border-white/20 border-t-white animate-spin" />
    </div>
  );
};

export default Loader;
