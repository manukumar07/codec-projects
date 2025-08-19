import { AlertTriangle } from "lucide-react";

const ErrorMessage = ({ error }) => (
  <div className="mb-8 max-w-md mx-auto animate-accordion-down">
    <div className="p-4 rounded-xl flex items-center space-x-3 text-[#F9FAFB] bg-[#DC2626]">
      <AlertTriangle size={20} className="text-[#F9FAFB]" />
      <span className="font-inter">{error}</span>
    </div>
  </div>
);

export default ErrorMessage;
