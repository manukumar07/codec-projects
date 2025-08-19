import TaskManager from "@/components/tasks/TaskManager";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useTasks } from "@/hooks/useTasks";

const Home = () => {
  const { tasks } = useTasks();

  return (
    <div className="min-h-screen flex flex-col">
      <Header tasks={tasks} />
      <main className="flex-1">
        <TaskManager />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
