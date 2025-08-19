import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6] font-sans">
      <div className="text-center animate-fade-in">
        <h1 className="text-[2.5rem] font-bold mb-4 text-[#111827]">404</h1>
        <p className="text-xl text-[#6B7280] mb-4">Oops! Page not found</p>
        <a
          href="/"
          className="text-[#3B82F6] hover:text-[#1E40AF] underline text-lg"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
