import { Sparkles } from "lucide-react";

const Header = () => {
  return (
    <nav className="sticky top-0 z-50 bg-[#FFFFFF]/95 backdrop-blur-sm border-b border-[#E5E7EB] shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-[#F97316]" />
            <h1 className="text-[2rem]  font-semibold tracking-tight">
              <span className="bg-[linear-gradient(90deg,#F97316,#F59E0B)] bg-clip-text text-transparent">
                Task
              </span>
              <span className="bg-[linear-gradient(90deg,#3B82F6,#8B5CF6)] bg-clip-text text-transparent">
                Flow
              </span>
            </h1>
          </div>

          {/* Desktop Badge */}
          <div className="hidden md:flex px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-sm font-medium font-sans">
            Task Management System
          </div>

          {/* Mobile Badge */}
          <div className="md:hidden">
            <div className="px-2 py-1 rounded-lg bg-[#F97316]/10 text-[#F97316] text-xs font-medium font-sans">
              TMS
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
