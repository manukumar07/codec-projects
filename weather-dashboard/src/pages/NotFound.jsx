import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6]">
      <div className="text-center animate-accordion-down">
        <h1 className="text-6xl font-bold mb-4 text-[#2563EB] font-poppins">
          404
        </h1>
        <p className="text-xl text-[#6B7280] mb-6 font-inter">
          Oops! Page not found
        </p>
        <a
          href="/"
          className="px-6 py-2 bg-[#2563EB] text-white rounded-lg shadow-md hover:bg-[#1E40AF] transition-colors font-poppins"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
