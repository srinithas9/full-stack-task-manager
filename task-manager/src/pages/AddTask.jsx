import { useState } from "react";
import axios from "axios";

function AddTask({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const token = localStorage.getItem("token");

  const handleAddTask = async () => {
    await axios.post("http://localhost:5000/tasks", { title, description, priority }, { headers: { Authorization: `Bearer ${token}` } });
    onTaskAdded();
  };

  return (
    <div>
      <h2>Add Task</h2>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
}

export default AddTask;