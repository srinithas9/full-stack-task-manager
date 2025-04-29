import { useState, useEffect } from "react";
import axios from "axios";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [statusFilter, setStatusFilter] = useState("All");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
  }, [statusFilter]);

  const fetchTasks = async () => {
    const query = statusFilter === "All" ? "" : `?status=${statusFilter}`;
    const response = await axios.get(`http://localhost:5000/tasks${query}`, { headers: { Authorization: `Bearer ${token}` } });
    setTasks(response.data);
  };

  const handleAddTask = async () => {
    try {
      await axios.post("http://localhost:5000/tasks", { title, description, priority }, { headers: { Authorization: `Bearer ${token}` } });
      fetchTasks(); // Refresh task list after adding a task
      setTitle(""); setDescription(""); setPriority("Medium"); // Reset fields
    } catch (error) {
      alert("Error adding task!");
    }
  };

  const markComplete = async (id) => {
    await axios.put(`http://localhost:5000/tasks/${id}/complete`, {}, { headers: { Authorization: `Bearer ${token}` } });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchTasks();
  };

  return (
    <div>
      <h2>Task Manager</h2>

      {/* Add Task Form */}
      <div>
        <h3>Add Task</h3>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {/* Filter Dropdown */}
      <select onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Incomplete">Active</option>
        <option value="Complete">Completed</option>
      </select>

      {/* Task List */}
      {tasks.map(task => (
        <div key={task._id}>
          <h3>{task.title} ({task.priority})</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          {task.status !== "Complete" && <button onClick={() => markComplete(task._id)}>Mark Complete</button>}
          <button onClick={() => deleteTask(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;