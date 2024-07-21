import { PlusCircleIcon } from "@heroicons/react/24/outline";
import TButton from "../components/core/TButton";
import PageComponent from "../components/PageComponent";
import TaskListItem from "../components/TaskListItem";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import PaginationLinks from "../components/PaginationLinks";

export default function Dashboard() {
  // const { tasks } = useStateContext();
  const [tasks, setTasks] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  console.log(tasks);

  const onDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      axiosClient.delete(`/task/${id}`).then(() => {
        getTasks();
      });
    }
  };

  const onPageClick = (link) => {
    getTasks(link.url);
  };

  const getTasks = (url) => {
    url = url || "/task";
    setLoading(true);
    axiosClient.get(url).then(({ data }) => {
      setTasks(data.data);
      setMeta(data.meta);
      setLoading(false);
    });
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <PageComponent
      title="Dashboard"
      buttons={
        <TButton color="green" to="/task/create">
          <PlusCircleIcon className="h-6 w-6 mr-2" />
          Create new
        </TButton>
      }
    >
      {loading && <div className="text-center text-lg">Loading...</div>}
      {!loading && (
        <div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {tasks.map((task) => (
              <TaskListItem
                task={task}
                key={task.id}
                onDeleteClick={onDeleteClick}
              />
            ))}
          </div>
          <PaginationLinks meta={meta} onPageClick={onPageClick} />
        </div>
      )}
    </PageComponent>
  );
}
