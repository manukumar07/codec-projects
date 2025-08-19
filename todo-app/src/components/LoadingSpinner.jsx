import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-[#000000]/50 z-50">
      {/* Spinner */}
      <div className="w-20 h-20 border-4 border-[#E5E7EB] border-t-[#3B82F6] rounded-full animate-spin mb-4"></div>

      {/* Loading Text */}
      <p className="text-[#FFFFFF] text-lg font-medium font-sans animate-pulse">
        Loading, please wait...
      </p>

      <p className="text-[#FFFFFF] text-sm mt-2 opacity-80 font-sans">
        Fetching content for you
      </p>
    </div>
  );
};

export default LoadingSpinner;
