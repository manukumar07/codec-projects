import { Sparkles, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#FFFFFF]/50 border-t border-[#E5E7EB] mt-12">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Description */}
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-[#F97316]" />
            <div>
              <h3 className="font-semibold text-[#111827] font-sans">
                TaskFlow
              </h3>
              <p className="text-sm text-[#6B7280] font-sans">
                Organize your life with style
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-[#6B7280] font-sans">
            <a href="#" className="hover:text-[#F97316] transition-colors">
              About
            </a>
            <a href="#" className="hover:text-[#F97316] transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-[#F97316] transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-[#F97316] transition-colors">
              Support
            </a>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-1 text-sm text-[#6B7280] font-sans">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-[#EF4444] fill-current" />
            <span>© 2025 TaskFlow</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
