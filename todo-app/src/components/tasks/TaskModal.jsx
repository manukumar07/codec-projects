import { useState } from "react";
import { Calendar, Flag, Trash2, Edit, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CategorySelect from "./CategorySelect";

const TaskModal = ({ task, mode, isOpen, onClose, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || "medium",
    category: task?.category || "work",
    dueDate: task?.dueDate || "",
  });

  const handleSave = () => {
    if (task && onUpdate) {
      onUpdate(task.id, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        category: formData.category,
        dueDate: formData.dueDate || undefined,
      });
    }
    onClose();
  };

  const handleDelete = () => {
    if (task && onDelete) onDelete(task.id);
    onClose();
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-[#FFFFFF] border border-[#E5E7EB] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] animate-slide-up">
        <DialogHeader className="pb-4 border-b border-[#E5E7EB]">
          <DialogTitle className="flex items-center gap-2 text-xl font-sans">
            {mode === "edit" && <Edit className="h-5 w-5 text-[#F97316]" />}
            {mode === "delete" && <Trash2 className="h-5 w-5 text-[#EF4444]" />}
            {mode === "view" && <div className="h-5 w-5" />}
            {mode === "edit"
              ? "Edit Task"
              : mode === "delete"
              ? "Delete Task"
              : "Task Details"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {mode === "delete" ? (
            <div className="text-center space-y-4">
              <div className="bg-[#EF4444]/10 rounded-lg p-6">
                <Trash2 className="h-12 w-12 text-[#EF4444] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#EF4444] mb-2">
                  Are you sure you want to delete this task?
                </h3>
                <p className="text-[#6B7280]">
                  "{task.title}" will be permanently deleted. This action cannot
                  be undone.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 font-sans">
              {/* Title */}
              <div>
                <Label htmlFor="title">Task Title</Label>
                {mode === "edit" ? (
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Enter task title..."
                    className="mt-2"
                  />
                ) : (
                  <p className="mt-2 text-lg font-semibold">{task.title}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                {mode === "edit" ? (
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Add a description..."
                    className="mt-2 min-h-[100px]"
                  />
                ) : (
                  <p className="mt-2 text-[#6B7280]">
                    {task.description || "No description provided"}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Priority */}
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  {mode === "edit" ? (
                    <Select
                      value={formData.priority}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, priority: value }))
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#F9FAFB] border border-[#E5E7EB] shadow-lg z-50">
                        <SelectItem value="high">
                          <div className="flex items-center gap-2">
                            <Flag className="h-4 w-4 text-[#EF4444]" />{" "}
                            <span>High Priority</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="medium">
                          <div className="flex items-center gap-2">
                            <Flag className="h-4 w-4 text-[#FBBF24]" />{" "}
                            <span>Medium Priority</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="low">
                          <div className="flex items-center gap-2">
                            <Flag className="h-4 w-4 text-[#10B981]" />{" "}
                            <span>Low Priority</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="mt-1 flex items-center gap-2">
                      <Flag
                        className={`h-4 w-4 ${
                          formData.priority === "high"
                            ? "text-[#EF4444]"
                            : formData.priority === "medium"
                            ? "text-[#FBBF24]"
                            : "text-[#10B981]"
                        }`}
                      />
                      <span className="capitalize">
                        {task.priority} Priority
                      </span>
                    </div>
                  )}
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category">Category</Label>
                  <div className="mt-1">
                    <CategorySelect
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, category: value }))
                      }
                      disabled={mode !== "edit"}
                    />
                  </div>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <Label htmlFor="due-date">Due Date</Label>
                {mode === "edit" ? (
                  <div className="relative mt-1">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
                    <Input
                      id="due-date"
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          dueDate: e.target.value,
                        }))
                      }
                      className="pl-10"
                    />
                  </div>
                ) : (
                  <p className="mt-1">
                    {task.dueDate
                      ? formatDate(task.dueDate)
                      : "No due date set"}
                  </p>
                )}
              </div>

              {/* Timestamps */}
              {mode === "view" && (
                <div className="pt-4 border-t border-[#E5E7EB]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#6B7280]">
                    <div>
                      <span className="font-medium">Created:</span>{" "}
                      {formatDate(task.createdAt)}
                    </div>
                    <div>
                      <span className="font-medium">Updated:</span>{" "}
                      {formatDate(task.updatedAt)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="pt-4 border-t border-[#E5E7EB]">
          {mode === "delete" ? (
            <div className="flex gap-3 w-full">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="flex-1"
              >
                <Trash2 className="h-4 w-4 mr-2" /> Delete Task
              </Button>
            </div>
          ) : mode === "edit" ? (
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-[linear-gradient(90deg,#F97316,#F59E0B)]"
              >
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </div>
          ) : (
            <Button
              onClick={onClose}
              className="bg-[linear-gradient(90deg,#F97316,#F59E0B)]"
            >
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default TaskModal;
