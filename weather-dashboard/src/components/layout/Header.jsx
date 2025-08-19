import { Cloud } from "lucide-react";
import UnitToggle from "../weather/UnitToggle";

const Header = ({ unit, onToggle }) => {
  return (
    <header className="flex justify-between items-center mb-8 animate-accordion-down">
      {/* Left side (Logo + Title) */}

      <div className="flex items-center space-x-3">
        <Cloud className="text-[#2563EB]" size={32} />
        <h1 className="font-poppins text-2xl font-bold text-[#111827]">
          Weather Dashboard
        </h1>
      </div>

      {/* Right side (Unit Toggle) */}
      <UnitToggle unit={unit} onToggle={onToggle} />
    </header>
  );
};

export default Header;
