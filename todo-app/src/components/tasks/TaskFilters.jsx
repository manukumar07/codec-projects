import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Star, Grid3X3 } from "lucide-react";

const TaskFilters = ({ filter, onFilterChange }) => {
  const filters = [
    { key: "all", label: "All Tasks", icon: Grid3X3 },
    { key: "active", label: "Active", icon: Circle },
    { key: "completed", label: "Completed", icon: CheckCircle2 },
    { key: "starred", label: "Starred", icon: Star },
  ];

  return (
    <div className="flex flex-wrap gap-2 font-sans">
      {filters.map(({ key, label, icon: Icon }) => (
        <Button
          key={key}
          variant={filter === key ? "bg-[#F97316] text-[#FFFFFF]" : "outline"}
          size="sm"
          onClick={() => onFilterChange(key)}
          className={`
            transition-all duration-200 
            flex items-center gap-1.5 px-3 py-1.5 
            rounded-md
            ${
              filter === key
                ? "bg-[#F97316] text-[#FFFFFF]"
                : "bg-[#FFFFFF] text-[#111827] border border-[#E5E7EB]"
            }
            hover:${filter !== key ? "bg-[#F97316]/10 text-[#F97316]" : ""}
          `}
        >
          <Icon
            className={`h-4 w-4 ${
              filter === key ? "text-[#FFFFFF]" : "text-[#111827]"
            }`}
          />
          <span className="text-sm">{label}</span>
        </Button>
      ))}
    </div>
  );
};
export default TaskFilters;
