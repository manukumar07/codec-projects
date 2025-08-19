const UnitToggle = ({ unit, onToggle }) => {
  return (
    <div className="flex items-center space-x-1 bg-[#FFFFFFCC] backdrop-blur-sm rounded-xl p-1 border border-[#E5E7EB80] font-poppins">
      {/* Celsius Button */}
      <button
        onClick={() => onToggle("celsius")}
        className={`
          rounded-lg text-sm font-medium px-3 py-1.5 transition-all duration-200
          ${
            unit === "celsius"
              ? "bg-[#2563EB] text-[#FFFFFF] shadow-md hover:bg-[#1D4ED8]"
              : "bg-transparent text-[#111827] hover:bg-[#F3F4F6] hover:text-[#2563EB]"
          }
        `}
      >
        °C
      </button>

      {/* Fahrenheit Button */}
      <button
        onClick={() => onToggle("fahrenheit")}
        className={`
          rounded-lg text-sm font-medium px-3 py-1.5 transition-all duration-200
          ${
            unit === "fahrenheit"
              ? "bg-[#2563EB] text-[#FFFFFF] shadow-md hover:bg-[#1D4ED8]"
              : "bg-transparent text-[#111827] hover:bg-[#F3F4F6] hover:text-[#2563EB]"
          }
        `}
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle;
