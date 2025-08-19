import {
  Briefcase,
  User,
  ShoppingCart,
  Heart,
  GraduationCap,
  DollarSign,
  MoreHorizontal,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CategorySelect = ({
  value,
  onValueChange,
  placeholder = "Select category",
}) => {
  const categories = [
    { value: "work", label: "Work", icon: Briefcase, color: "text-[#3B82F6]" }, // Blue
    {
      value: "personal",
      label: "Personal",
      icon: User,
      color: "text-[#10B981]",
    },
    {
      value: "shopping",
      label: "Shopping",
      icon: ShoppingCart,
      color: "text-[#8B5CF6]",
    },
    { value: "health", label: "Health", icon: Heart, color: "text-[#EF4444]" }, // Red
    {
      value: "education",
      label: "Education",
      icon: GraduationCap,
      color: "text-[#6366F1]",
    },
    {
      value: "finance",
      label: "Finance",
      icon: DollarSign,
      color: "text-[#F59E0B]",
    },
    {
      value: "other",
      label: "Other",
      icon: MoreHorizontal,
      color: "text-[#6B7280]",
    },
  ];

  const selectedCategory = categories.find((cat) => cat.value === value);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-md font-sans">
        <SelectValue placeholder={placeholder}>
          {selectedCategory && (
            <div className="flex items-center gap-2">
              <selectedCategory.icon
                className={`h-4 w-4 ${selectedCategory.color}`}
              />
              <span>{selectedCategory.label}</span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>

      <SelectContent className="bg-[#F9FAFB] border border-[#E5E7EB] shadow-lg z-50 font-sans">
        {categories.map((category) => (
          <SelectItem
            key={category.value}
            value={category.value}
            className="flex items-center gap-2"
          >
            <category.icon className={`h-4 w-4 ${category.color}`} />
            <span>{category.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;
