import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, MapPin } from "lucide-react";

const SearchBar = ({ onSearch, isLoading = false }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setSearchTerm("");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto font-poppins">
      <form onSubmit={handleSubmit} className="relative group">
        <div
          className={`relative flex items-center rounded-2xl transition-all duration-300 ${
            isFocused
              ? "shadow-lg shadow-[#2563EB33] scale-[1.02]"
              : "hover:shadow-md hover:scale-[1.01]"
          }`}
        >
          {/* Input */}
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search for any city worldwide..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`
                h-14 pl-12 pr-24 rounded-2xl border-2 
                bg-[#FFFFFFE6] backdrop-blur-md text-[#111827] placeholder:text-[#9CA3AF]
                transition-all duration-300 ease-out
                ${
                  isFocused
                    ? "border-[#2563EB80] bg-[#FFFFFF] shadow-inner"
                    : "border-[#E5E7EB4D] hover:border-[#E5E7EB99]"
                }
                focus:ring-2 focus:ring-[#2563EB33] focus:border-[#2563EB]
              `}
              disabled={isLoading}
            />

            {/* Search Icon */}
            <div
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                isFocused
                  ? "text-[#2563EB] scale-110"
                  : "text-[#9CA3AF] group-hover:text-[#111827]"
              }`}
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Search size={20} />
              )}
            </div>

            {/* Search button */}
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              {/* MapPin icon before button */}
              <MapPin size={16} className="text-[#2563EB]" />

              {/* Search button */}
              <Button
                type="submit"
                variant="default"
                size="sm"
                disabled={isLoading || !searchTerm.trim()}
                className={`
      h-10 px-4 rounded-xl font-medium transition-all duration-200
      hover:scale-105 active:scale-95
      disabled:opacity-50 disabled:hover:scale-100
      bg-[#2563EB] hover:bg-[#1D4ED8] text-[#FFFFFF]
    `}
              >
                {isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    <Search size={16} className="mr-1" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Gradient border effect */}
        <div
          className={`
            absolute inset-0 rounded-2xl bg-gradient-to-r 
            from-[#2563EB33] via-[#6B728033] to-[#2563EB33]
            opacity-0 transition-opacity duration-300 -z-10 blur-sm
            ${isFocused ? "opacity-100" : ""}
          `}
        />
      </form>

      {/* Quick suggestions */}
      {isFocused && (
        <div className="mt-2 text-md text-[#9CA3AF] text-center animate-fade-in">
          Try: New York, London, Tokyo, Pune, Delhi
        </div>
      )}
    </div>
  );
};

export default SearchBar;
