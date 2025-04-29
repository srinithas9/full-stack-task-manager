import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/tasks/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Move `handleAddTask` inside the component
  const handleAddTask = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/tasks/",
        {
          title: "New Task",
          description: "Details here",
          status: "Incomplete",
          priority: "Medium",
          userId: "6618abc1234567890def0123", // Replace with actual user ID
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - {task.status}
          </li>
        ))}
      </ul>
      
      {/* Ensure button is correctly placed within the JSX return statement */}
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
}

export default Dashboard;