import React, { use, useEffect, useState } from "react";

const TaskList = () => {
  // Use State Hooks Declarations
  const [taskList, setTaskList] = useState(() => {
    const savedTaskList = localStorage.getItem("storedTaskList");
    return savedTaskList ? JSON.parse(savedTaskList) : [];
  });

  const [newTask, setNewTask] = useState("");

  // Declaration of variables for current date and time
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  // Use Effect hook to set the items in the local storage
  useEffect(() => {
    localStorage.setItem("storedTaskList", JSON.stringify(taskList)),
      [taskList];
  });

  // Use Effect hook to set the items in the local storage
  useEffect(() => {
    updateDateTime();

    const interval = setInterval(() => {
      updateDateTime();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Functions

  //  1. Handle Input Change
  function handleInputChange(event) {
    setNewTask(event.target.value);
  }
  //  2. Add Tasks
  function handleAddTask() {
    if (newTask.trim() !== "" && !taskList.includes(newTask.trim())) {
      setTaskList([...taskList, newTask]);
      setNewTask("");
    }
  }
  //  3. Delete Tasks
  function deleteTask(index) {
    const updatedTaskList = taskList.filter(
      (tempElement, tempIndex) => tempIndex !== index
    );
    setTaskList(updatedTaskList);
  }
  //  4. Clear Tasks
  function handleClearTask() {
    setTaskList([]);
  }
  //  5. Move Task Up
  function moveTaskUp(index) {
    if (index > 0) {
      setTaskList((prevList) => {
        const updatedTaskList = [...prevList];
        [updatedTaskList[index], updatedTaskList[index - 1]] = [
          updatedTaskList[index - 1],
          updatedTaskList[index],
        ];
        return updatedTaskList;
      });
    }
  }
  //  6. Move Task Down
  function moveTaskDown(index) {
    setTaskList((prevList) => {
      if (index < prevList.length - 1) {
        const updatedTaskList = [...prevList];
        [updatedTaskList[index], updatedTaskList[index + 1]] = [
          updatedTaskList[index + 1],
          updatedTaskList[index],
        ];
        return updatedTaskList;
      }
      return prevList;
    });
  }

  // 7. Updating Date and Time
  function updateDateTime() {
    const date = new Date();

    const formattedDate = date.toLocaleDateString("en-us", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setCurrentDate(formattedDate);
    setCurrentTime(formattedTime);
  }

  return (
    <>
      <h1 className="main-heading">To Do List</h1>
      <div className="date-time-wrapper">
        <p className="current-date">{currentDate}</p>
        <p className="currenttime">{currentTime}</p>
      </div>

      {/* Task Input Field */}
      <div className="input-task">
        <input
          type="text"
          name="Task Input"
          className="add-task-input"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Enter a new task..."
          aria-label="Enter a new task"
        />
        <div className="buttons-wrapper">
          <input
            type="submit"
            value="Add Task"
            onClick={handleAddTask}
            aria-label="Add new task"
          />
          {/* Clear All Button */}
          <button
            className="clear-task-btn"
            onClick={handleClearTask}
            aria-label="Clear all tasks"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Task List */}
      <ol className="task-list">
        {taskList.map((taskElement, index) => (
          <li key={index} className="task-item">
            <span className="task-item-text">{taskElement}</span>
            <div className="task-action-buttons-wrapper">
              <button
                className="delete-task-item-btn"
                onClick={() => deleteTask(index)}
                aria-label="Delete task"
              >
                ⛔
              </button>
              <button
                className="move-task-up-btn"
                onClick={() => moveTaskUp(index)}
                aria-label="Move Task Up"
              >
                ⬆️
              </button>
              <button
                className="move-task-down-btn"
                onClick={() => moveTaskDown(index)}
                aria-label="Move Task Down"
              >
                ⬇️
              </button>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
};

export default TaskList;
