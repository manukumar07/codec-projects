import { useState } from "react";
import { Calendar, Flag, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CategorySelect from "./CategorySelect";

const TaskForm = ({
  onSubmit,
  onCancel,
  initialTitle = "",
  initialDescription = "",
  initialPriority = "medium",
  initialCategory = "work",
  initialDueDate = "",
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [priority, setPriority] = useState(initialPriority);
  const [category, setCategory] = useState(initialCategory);
  const [dueDate, setDueDate] = useState(initialDueDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(
        title.trim(),
        description.trim(),
        priority,
        category,
        dueDate || undefined
      );
      setTitle("");
      setDescription("");
      setPriority("medium");
      setCategory("work");
      setDueDate("");
    }
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6 font-sans">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-[#111827]">
            Create New Task
          </h3>
          <p className="text-sm text-[#6B7280] mt-1">
            Fill in the details to create a new task
          </p>
        </div>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <Label
              htmlFor="task-title"
              className="text-sm font-medium text-[#111827]"
            >
              Task Title *
            </Label>
            <Input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="mt-2 h-11"
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <Label
              htmlFor="task-description"
              className="text-sm font-medium text-[#111827]"
            >
              Description
            </Label>
            <Textarea
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details about this task..."
              className="mt-2 min-h-[120px] max-h-[300px] resize-y overflow-y-auto"
            />
          </div>

          {/* Priority */}
          <div>
            <Label
              htmlFor="priority"
              className="text-sm font-medium text-[#111827]"
            >
              Priority
            </Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="mt-1 h-11 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#F9FAFB] border border-[#E5E7EB] shadow-lg z-50 w-full">
                <SelectItem value="high">
                  <div className="flex items-center gap-2">
                    <Flag className="h-4 w-4 text-[#EF4444]" />
                    <span>High Priority</span>
                  </div>
                </SelectItem>
                <SelectItem value="medium">
                  <div className="flex items-center gap-2">
                    <Flag className="h-4 w-4 text-[#FBBF24]" />
                    <span>Medium Priority</span>
                  </div>
                </SelectItem>
                <SelectItem value="low">
                  <div className="flex items-center gap-2">
                    <Flag className="h-4 w-4 text-[#10B981]" />
                    <span>Low Priority</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div className="w-full">
            <Label
              htmlFor="category"
              className="text-sm font-medium text-[#111827]"
            >
              Category
            </Label>
            <div className="mt-2 max-w-full">
              <CategorySelect
                value={category}
                onValueChange={setCategory}
                placeholder="Select a category"
                className="w-full"
              />
            </div>
          </div>

          {/* Due Date */}
          <div>
            <Label
              htmlFor="due-date"
              className="text-sm font-medium text-[#111827]"
            >
              Due Date (Optional)
            </Label>
            <div className="relative mt-2 w-full">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
              <Input
                id="due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="pl-10 h-11 w-full"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-[#E5E7EB]">
          <Button
            type="submit"
            disabled={!title.trim()}
            className="bg-[#F97316] hover:shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-all duration-300 flex-1 flex items-center justify-center"
          >
            <Save className="h-4 w-4 mr-2" />
            Create Task
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="px-8 border border-[#E5E7EB] text-[#111827]"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
export default TaskForm;
