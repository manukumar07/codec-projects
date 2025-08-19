import { useState } from "react";
import { Plus, Search, Grid3X3, List, Sparkles } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useTasks } from "@/hooks/useTasks";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import TaskFilters from "./TaskFilters";
import { TaskStats } from "./TaskStats";
import TaskModal from "./TaskModal";

const TaskManager = () => {
  const {
    tasks,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    taskCounts,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    toggleStar,
    clearCompleted,
    reorderTasks,
  } = useTasks();

  const [viewMode, setViewMode] = useState("grid");
  const [showAddForm, setShowAddForm] = useState(false);
  const [modalTask, setModalTask] = useState(null);
  const [modalMode, setModalMode] = useState("view");

  const handleAddTask = (title, description, priority, category, dueDate) => {
    const newTask = addTask(title, description, priority, category);
    if (dueDate) updateTask(newTask.id, { dueDate });
    toast.success(`Task "${newTask.title}" added successfully!`);
    setShowAddForm(false);
  };

  const handleEditTask = (task) => {
    setModalTask(task);
    setModalMode("edit");
  };

  const handleDeleteTask = (task) => {
    setModalTask(task);
    setModalMode("delete");
  };

  const handleViewTask = (task) => {
    setModalTask(task);
    setModalMode("view");
  };

  const closeModal = () => setModalTask(null);

  const handleToggleStar = (id) => {
    const task = tasks.find((t) => t.id === id);
    toggleStar(id);
    if (task) {
      toast(
        task.starred
          ? `"${task.title}" removed from starred tasks`
          : `"${task.title}" added to starred tasks`
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans">
      {/* React Hot Toast Toaster */}
      <Toaster position="bottom-center" reverseOrder={false} />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-4 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-2 relative">
            <Sparkles className="h-10 w-10 text-[#F97316] animate-pulse relative z-10" />
            <div className="absolute inset-0 h-12 w-12 bg-[#F97316]/20 rounded-full blur-xl"></div>
          </div>
          <h1 className="text-[2rem] mb-4 font-semibold tracking-tight">
            <span className="bg-[linear-gradient(90deg,#F97316,#F59E0B)] bg-clip-text text-transparent">
              Task
            </span>
            <span className="bg-[linear-gradient(90deg,#3B82F6,#8B5CF6)] bg-clip-text text-transparent">
              Flow
            </span>
          </h1>
          <p className="text-[#6B7280] text-md max-w-3xl mx-auto leading-relaxed mt-2 font-semibold">
            The Smarter Way to Manage Tasks
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="h-1 w-12 bg-[#F97316] rounded-full"></div>
            <div className="h-1 w-8 bg-[#F97316]/60 rounded-full"></div>
            <div className="h-1 w-4 bg-[#F97316]/30 rounded-full"></div>
          </div>
        </div>

        {/* Controls */}
        <Card className="p-8 mb-8 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] animate-slide-up border-2 border-transparent hover:border-[#F97316]/20 transition-all duration-300 bg-gradient-to-br from-[#FFFFFF]/90 to-[#F3F4F6] backdrop-blur-sm">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-[linear-gradient(90deg,#F97316,#F59E0B)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-all duration-300"
                size="lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New Task
              </Button>

              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 " />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 "
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <TaskFilters filter={filter} onFilterChange={setFilter} />
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <TaskStats
          counts={taskCounts}
          onClearCompleted={() => {
            clearCompleted();
            toast.success("Completed tasks cleared!");
          }}
        />

        {/* Task List */}
        <TaskList
          tasks={tasks}
          viewMode={viewMode}
          onUpdate={updateTask}
          onDelete={deleteTask}
          onToggleComplete={toggleComplete}
          onToggleStar={handleToggleStar}
          onReorder={reorderTasks}
          onEdit={handleEditTask}
          onDeleteModal={handleDeleteTask}
          onView={handleViewTask}
        />

        {/* Add Task Modal */}
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogContent className="max-w-2xl bg-[#FFFFFF] border border-[#E5E7EB] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]">
            <TaskForm
              onSubmit={handleAddTask}
              onCancel={() => setShowAddForm(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Task Modal */}
        <TaskModal
          task={modalTask}
          mode={modalMode}
          isOpen={!!modalTask}
          onClose={closeModal}
          onUpdate={updateTask}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
};

export default TaskManager;
