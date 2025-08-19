import { Trash2, TrendingUp, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const TaskStats = ({ counts, onClearCompleted }) => {
  const stats = [
    {
      label: "Total Tasks",
      value: counts.total,
      icon: TrendingUp,
      color: "text-[#F97316]",
    },
    {
      label: "Active",
      value: counts.active,
      icon: CheckCircle,
      color: "text-[#3B82F6]",
    },
    {
      label: "Completed",
      value: counts.completed,
      icon: CheckCircle,
      color: "text-[#10B981]",
    },
    {
      label: "Starred",
      value: counts.starred,
      icon: Star,
      color: "text-[#F59E0B]",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 font-sans">
      {stats.map((stat, index) => (
        <Card
          key={stat.label}
          className="p-4 text-center shadow-[0_1px_3px_rgba(0,0,0,0.1)] animate-scale-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
            <span className="text-2xl font-bold">{stat.value}</span>
          </div>
          <p className="text-sm text-[#6B7280]">{stat.label}</p>
        </Card>
      ))}

      {counts.completed > 0 && (
        <Card className="p-4 flex items-center justify-center md:col-span-4 lg:col-span-1 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
          <Button
            variant="outline"
            size="sm"
            onClick={onClearCompleted}
            className="text-[#EF4444] hover:bg-[#EF4444] hover:text-[#FFFFFF] transition-all duration-200"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Completed
          </Button>
        </Card>
      )}
    </div>
  );
};
