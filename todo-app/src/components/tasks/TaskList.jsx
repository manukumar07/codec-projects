import TaskCard from "./TaskCard";
import TaskTable from "./TaskTable";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

const TaskList = ({
  tasks,
  viewMode,
  onUpdate,
  onDelete,
  onToggleComplete,
  onToggleStar,
  onReorder,
  onEdit,
  onDeleteModal,
  onView,
}) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    onReorder(result.source.index, result.destination.index);
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in font-sans">
        <div className="text-[6rem] mb-4">📝</div>
        <h3 className="text-xl font-semibold mb-2 text-[#111827]">
          No tasks found
        </h3>
        <p className="text-[#6B7280]">
          Create your first task to get started with TaskFlow!
        </p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map((task, index) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    index={index}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onToggleComplete={onToggleComplete}
                    onToggleStar={onToggleStar}
                    onEdit={onEdit}
                    onDeleteModal={onDeleteModal}
                    onView={onView}
                  />
                ))}
              </div>
            ) : (
              <TaskTable
                tasks={tasks}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onToggleComplete={onToggleComplete}
                onToggleStar={onToggleStar}
                onEdit={onEdit}
                onDeleteModal={onDeleteModal}
                onView={onView}
              />
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default TaskList;
