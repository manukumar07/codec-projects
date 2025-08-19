const LoadingSpinner = () => (
  <div className="text-center mb-8">
    <div className="p-8 rounded-2xl max-w-md mx-auto  text-[#1F2937] animate-accordion-down">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F2937] mx-auto mb-4 mt-48"></div>
      <p className="font-poppins font-md text-[#1F2937]">
        Loading weather data...
      </p>
    </div>
  </div>
);

export default LoadingSpinner;
