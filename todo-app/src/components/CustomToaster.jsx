import { Toaster } from "react-hot-toast";

const CustomToaster = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        className:
          "rounded-xl px-4 py-3 font-sans text-sm shadow-lg animate-accordion-down",
        success: {
          className: "bg-[#10B981] text-[#FFFFFF]",
          iconTheme: {
            primary: "#FFFFFF",
            secondary: "#10B981",
          },
        },
        error: {
          className: "bg-[#DC2626] text-[#FFFFFF]",
          iconTheme: {
            primary: "#FFFFFF",
            secondary: "#DC2626",
          },
        },
        loading: {
          className: "bg-[#2563EB] text-[#FFFFFF]",
          iconTheme: {
            primary: "#FFFFFF",
            secondary: "#2563EB",
          },
        },
      }}
    />
  );
};

export default CustomToaster;
