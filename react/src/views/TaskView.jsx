import { useEffect, useState } from "react";
import PageComponent from "../components/PageComponent";
import TButton from "../components/core/TButton";
import axiosClient from "../axios.js";
import { useNavigate, useParams } from "react-router-dom";

export default function TaskView() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [task, setTask] = useState({
    title: "",
    description: "",
    status_id: "1",
    deadline: "",
    priority: "",
    assign_to: "",
  });

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = { ...task };

    let res = null;
    if (id) {
      res = axiosClient.put(`/task/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
    } else {
      res = axiosClient.post("/task", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
    }

    res
      .then((res) => {
        console.log(res);
        navigate("/dashboard");
      })
      .catch((err) => {
        if (err && err.response) {
          setError(err.response.data.message);
        }
        console.log(err, err.response);
      });

    // axiosClient.post("/task", {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
    //   },
    //   title: "Prueba",
    //   description: "Prueba description",
    //   deadline: "2024-07-30",
    //   status_id: "1",
    // });
  };

  const handleStatusChange = (event) => {
    setTask({ ...task, status_id: event.target.value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  useEffect(() => {
    axiosClient
      .get("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.error("Error fetching users: ", error);
      });
    if (id) {
      setLoading(true);
      axiosClient.get(`/task/${id}`).then(({ data }) => {
        setTask(data.data);
        setLoading(false);
      });
    }
  }, []);

  return (
    <PageComponent title={!id ? "Create new Task" : "Update Survey"}>
      {loading && <div className="text-center text-lg">Loading...</div>}
      {!loading && (
        <form action="#" method="POST" onSubmit={onSubmit}>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              <div>
                {error && (
                  <div className="bg-red-500 text-white py-3 px-3">{error}</div>
                )}
                {/*Title*/}
                <div className="col-span-6 sm:col-span-3 py-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 py-2"
                  >
                    Task Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={task.title}
                    onChange={(ev) =>
                      setTask({ ...task, title: ev.target.value })
                    }
                    placeholder="Task Title"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                {/*Title*/}
                {/*Description*/}
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 py-2"
                  >
                    Description
                  </label>
                  {/* <pre>{ JSON.stringify(survey, undefined, 2) }</pre> */}
                  <textarea
                    name="description"
                    id="description"
                    value={task.description || ""}
                    onChange={(ev) =>
                      setTask({ ...task, description: ev.target.value })
                    }
                    placeholder="Describe your survey"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  ></textarea>
                </div>
                {/*Description*/}
                {/*Deadline*/}
                <div className="col-span-6 sm:col-span-3 py-2">
                  <label
                    htmlFor="deadline"
                    className="block text-sm font-medium text-gray-700 py-2"
                  >
                    Time limit
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    id="deadline"
                    value={task.deadline}
                    onChange={(ev) =>
                      setTask({ ...task, deadline: ev.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                {/*Deadline*/}
                {/* User Selection */}
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="assign_to"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Assing to
                  </label>
                  <select
                    name="assign_to"
                    id="assign_to"
                    value={task.assign_to}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">Seleccione un usuario</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* User Selection */}
                {/*Status*/}
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900 py-2">
                    Status
                  </legend>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="status-pending"
                        name="status"
                        type="radio"
                        value="1"
                        checked={task.status_id === "1"}
                        onChange={handleStatusChange}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="status-pending"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Pending
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="status-in-progress"
                        name="status"
                        type="radio"
                        value="2"
                        checked={task.status_id === "2"}
                        onChange={handleStatusChange}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="status-in-progress"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        In progress
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="status-completed"
                        name="status"
                        type="radio"
                        value="3"
                        checked={task.status_id === "3"}
                        onChange={handleStatusChange}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="status-completed"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Completed
                      </label>
                    </div>
                  </div>
                </fieldset>
                {/*Status*/}
                {/*Priority*/}
                <div className="col-span-6 sm:col-span-3 py-2">
                  <label
                    htmlFor="priority"
                    className="block text-sm font-medium text-gray-700 py-2"
                  >
                    Priority
                  </label>
                  <input
                    type="text"
                    name="priority"
                    id="priority"
                    value={task.priority || ""}
                    onChange={(ev) =>
                      setTask({ ...task, priority: ev.target.value })
                    }
                    placeholder="Priority"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                {/*Priority*/}
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <TButton>Save task</TButton>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </PageComponent>
  );
}
