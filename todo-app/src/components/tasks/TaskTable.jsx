import { useState } from "react";
import { Star, Trash2, Edit, Calendar, Flag, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const TaskTable = ({
  tasks,
  onUpdate,
  onDelete,
  onToggleComplete,
  onToggleStar,
  onEdit,
  onDeleteModal,
  onView,
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleStartEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.title);
  };

  const handleSaveEdit = (taskId) => {
    if (
      editText.trim() &&
      editText !== tasks.find((t) => t.id === taskId)?.title
    ) {
      onUpdate(taskId, { title: editText.trim() });
    }
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-[#EF4444] text-[#EF4444] bg-[#EF4444]/10";
      case "medium":
        return "border-[#FBBF24] text-[#FBBF24] bg-[#FBBF24]/10";
      case "low":
        return "border-[#10B981] text-[#10B981] bg-[#10B981]/10";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isOverdue = (dueDate, completed) => {
    return dueDate && new Date(dueDate) < new Date() && !completed;
  };

  return (
    <Card className="overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.1)] animate-slide-up border-2 border-transparent hover:border-[#F97316]/10 transition-all duration-300 font-sans">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-[#6B7280]/30 to-[#6B7280]/50 backdrop-blur-sm">
            <tr>
              {[
                "Status",
                "Task",
                "Category",
                "Priority",
                "Due Date",
                "Star",
                "Actions",
              ].map((col) => (
                <th
                  key={col}
                  className="text-left p-5 font-semibold text-sm text-[#111827]"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {tasks.map((task, index) => (
              <tr
                key={task.id}
                className={cn(
                  "group hover:bg-gradient-to-r hover:from-[#6B7280]/20 hover:to-[#6B7280]/10 transition-all duration-300 animate-fade-in border-b border-[#E5E7EB]/50",
                  task.completed && "opacity-60",
                  task.starred &&
                    "bg-gradient-to-r from-[#F59E0B]/5 to-transparent"
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Status */}
                <td className="p-4">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => onToggleComplete(task.id)}
                  />
                </td>

                {/* Task Text */}
                <td className="p-4 max-w-md">
                  {editingId === task.id ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveEdit(task.id);
                          if (e.key === "Escape") handleCancelEdit();
                        }}
                        autoFocus
                        className="text-sm"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSaveEdit(task.id)}
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancelEdit}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer hover:bg-[#F3F4F6]/20 rounded-lg p-2 -m-2 transition-colors"
                      onClick={() => onView(task)}
                    >
                      <div
                        className={cn(
                          "text-base font-semibold mb-2",
                          task.completed && "line-through text-[#6B7280]"
                        )}
                      >
                        {task.title}
                      </div>
                      {task.description && (
                        <div className="text-sm text-[#6B7280] line-clamp-2 leading-relaxed">
                          {task.description}
                        </div>
                      )}
                    </div>
                  )}
                </td>

                {/* Category */}
                <td className="p-4">
                  <Badge
                    variant="outline"
                    className="text-sm capitalize font-medium px-3 py-1 bg-[#6B7280]/30 border-[#6B7280]"
                  >
                    {task.category}
                  </Badge>
                </td>

                {/* Priority */}
                <td className="p-4">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-sm font-medium px-3 py-1",
                      getPriorityColor(task.priority)
                    )}
                  >
                    <Flag className="h-3 w-3 mr-1" />
                    {task.priority.toUpperCase()}
                  </Badge>
                </td>

                {/* Due Date */}
                <td className="p-4">
                  {task.dueDate ? (
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        isOverdue(task.dueDate, task.completed) &&
                          "border-[#EF4444] text-[#EF4444] bg-[#EF4444]/10"
                      )}
                    >
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(task.dueDate)}
                    </Badge>
                  ) : (
                    <span className="text-[#6B7280] text-sm">No date</span>
                  )}
                </td>

                {/* Star */}
                <td className="p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleStar(task.id)}
                    className={cn(
                      "h-8 w-8 p-0 transition-all duration-300 hover:scale-110",
                      task.starred && "text-[#F59E0B] hover:text-[#F59E0B]/80"
                    )}
                  >
                    <Star
                      className={cn(
                        "h-4 w-4 transition-transform",
                        task.starred && "fill-current scale-110"
                      )}
                    />
                  </Button>
                </td>

                {/* Actions */}
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    {editingId !== task.id && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(task)}
                          className="h-8 w-8 p-0 bg-[#F97316]/5 hover:bg-[#F97316]/10 border-[#F97316]/20"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDeleteModal(task)}
                          className="h-8 w-8 p-0 bg-[#EF4444]/5 hover:bg-[#EF4444]/10 border-[#EF4444]/20 text-[#EF4444] hover:text-[#EF4444]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
export default TaskTable;
