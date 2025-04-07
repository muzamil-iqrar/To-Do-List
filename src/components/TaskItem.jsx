import React from "react";

const TaskItem = ({ task, index, onDelete, onMoveUp, onMoveDown }) => (
  <li className="task-item">
    <span className="task-item-text">{task}</span>
    <div className="task-action-buttons-wrapper">
      <button
        className="delete-task-item-btn"
        onClick={() => onDelete(index)}
        aria-label="Delete task"
      >
        ⛔
      </button>
      <button
        className="move-task-up-btn"
        onClick={() => onMoveUp(index)}
        aria-label="Move Task Up"
      >
        ⬆️
      </button>
      <button
        className="move-task-down-btn"
        onClick={() => onMoveDown(index)}
        aria-label="Move Task Down"
      >
        ⬇️
      </button>
    </div>
  </li>
);

export default TaskItem;
