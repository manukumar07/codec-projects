import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import {
  MoreVertical,
  Star,
  Trash2,
  Edit,
  Calendar,
  Flag,
  GripVertical,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const TaskCard = ({
  task,
  index,
  onUpdate,
  onToggleComplete,
  onToggleStar,
  onEdit,
  onDeleteModal,
  onView,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const handleSaveEdit = () => {
    if (editText.trim() && editText !== task.title) {
      onUpdate(task.id, { title: editText.trim() });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(task.title);
    setIsEditing(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-[#EF4444] text-[#EF4444] bg-[#EF4444]/10";
      case "medium":
        return "border-[#FBBF24] text-[#FBBF24] bg-[#FBBF24]/10";
      case "low":
        return "border-[#10B981] text-[#10B981] bg-[#10B981]/10";
      default:
        return "";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const isOverdue =
    task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={cn(
            `p-6 transition-all duration-300 animate-[scale-in_0.2s_ease-out] group
             border-2 border-transparent rounded-xl
             bg-[linear-gradient(90deg,#FFFFFF,#F3F4F6)]
             font-sans`,
            task.completed && "opacity-60",
            snapshot.isDragging &&
              "rotate-2 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] scale-105 border-[rgba(249,115,22,0.3)]",
            task.starred &&
              "border-[rgba(245,158,11,0.3)] bg-[linear-gradient(90deg,#FFFBEB,#FFFFFF)] shadow-[0_4px_6px_rgba(245,158,11,0.3)]"
          )}
        >
          <div className="flex items-start gap-3">
            {/* Drag Handle */}
            <div
              {...provided.dragHandleProps}
              className="opacity-0 group-hover:opacity-100 transition-opacity mt-1 cursor-grab active:cursor-grabbing"
            >
              <GripVertical className="h-4 w-4 text-[#6B7280]" />
            </div>

            {/* Checkbox */}
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => onToggleComplete(task.id)}
              className="mt-1"
            />

            {/* Content */}
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveEdit();
                      if (e.key === "Escape") handleCancelEdit();
                    }}
                    autoFocus
                    className="text-sm font-sans"
                  />
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleSaveEdit}
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
                </div>
              ) : (
                <div className="space-y-3">
                  <div
                    className="cursor-pointer hover:bg-[#F3F4F6]/20 rounded-lg p-2 -m-2 transition-colors"
                    onClick={() => onView(task)}
                  >
                    <h3
                      className={cn(
                        "text-base font-semibold leading-relaxed break-words mb-2 font-sans",
                        task.completed && "line-through text-[#6B7280]"
                      )}
                    >
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-sm text-[#6B7280] line-clamp-2 mb-3">
                        {task.description}
                      </p>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs font-medium px-3 py-1 border rounded-full flex items-center gap-1",
                          getPriorityColor(task.priority)
                        )}
                      >
                        <Flag className="h-3 w-3" />
                        {task.priority.toUpperCase()}
                      </Badge>

                      <Badge
                        variant="outline"
                        className="text-xs capitalize font-medium px-3 py-1 bg-[#F3F4F6]/30 border-[#E5E7EB] rounded-full"
                      >
                        {task.category}
                      </Badge>
                    </div>

                    {task.dueDate && (
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs font-medium px-3 py-1 w-fit border rounded-full flex items-center gap-1",
                          isOverdue &&
                            "border-[#EF4444] text-[#EF4444] bg-[#EF4444]/10"
                        )}
                      >
                        <Calendar className="h-3 w-3" />
                        {formatDate(task.dueDate)}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            {!isEditing && (
              <div className="flex flex-col gap-2">
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
              </div>
            )}
          </div>
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCard;
