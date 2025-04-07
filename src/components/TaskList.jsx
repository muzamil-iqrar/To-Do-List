import React, { useEffect, useState } from "react";
import TaskInput from "./TaskInput";
import TaskListDisplay from "./TaskListDisplay";
import DateTimeDisplay from "./DateTimeDisplay";

const TaskList = () => {
  const [taskList, setTaskList] = useState(() => {
    const saved = localStorage.getItem("storedTaskList");
    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed.filter((t) => t.trim() !== "") : [];
    } catch {
      return [];
    }
  });

  const [newTask, setNewTask] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  // Save to localStorage when taskList changes
  useEffect(() => {
    localStorage.setItem("storedTaskList", JSON.stringify(taskList));
  }, [taskList]);

  // Update date & time
  useEffect(() => {
    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const updateDateTime = () => {
    const date = new Date();
    setCurrentDate(
      date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
    setCurrentTime(
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  const handleInputChange = (e) => setNewTask(e.target.value);

  const handleAddTask = () => {
    const trimmed = newTask.trim();
    if (trimmed && !taskList.includes(trimmed)) {
      setTaskList([...taskList, trimmed]);
      setNewTask("");
    }
  };

  const handleClearTask = () => {
    setTaskList([]);
    localStorage.removeItem("storedTaskList");
  };

  const deleteTask = (index) => {
    setTaskList(taskList.filter((_, i) => i !== index));
  };

  const moveTaskUp = (index) => {
    if (index > 0) {
      const updated = [...taskList];
      [updated[index], updated[index - 1]] = [
        updated[index - 1],
        updated[index],
      ];
      setTaskList(updated);
    }
  };

  const moveTaskDown = (index) => {
    if (index < taskList.length - 1) {
      const updated = [...taskList];
      [updated[index], updated[index + 1]] = [
        updated[index + 1],
        updated[index],
      ];
      setTaskList(updated);
    }
  };

  return (
    <>
      <h1 className="main-heading">To Do List</h1>
      <DateTimeDisplay currentDate={currentDate} currentTime={currentTime} />
      <TaskInput
        newTask={newTask}
        onChange={handleInputChange}
        onAdd={handleAddTask}
        onClear={handleClearTask}
      />
      <TaskListDisplay
        taskList={taskList}
        onDelete={deleteTask}
        onMoveUp={moveTaskUp}
        onMoveDown={moveTaskDown}
      />
    </>
  );
};

export default TaskList;
