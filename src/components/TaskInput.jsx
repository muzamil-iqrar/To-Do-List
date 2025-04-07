import React from "react";

const TaskInput = ({ newTask, onChange, onAdd, onClear }) => (
  <div className="input-task">
    <input
      type="text"
      className="add-task-input"
      value={newTask}
      onChange={onChange}
      placeholder="Enter a new task..."
      aria-label="Enter a new task"
    />
    <div className="buttons-wrapper">
      <input
        type="submit"
        value="Add Task"
        onClick={onAdd}
        aria-label="Add new task"
      />
      <button
        className="clear-task-btn"
        onClick={onClear}
        aria-label="Clear all tasks"
      >
        Clear All
      </button>
    </div>
  </div>
);

export default TaskInput;
