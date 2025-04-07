import React from "react";
import TaskItem from "./TaskItem";

const TaskListDisplay = ({ taskList, onDelete, onMoveUp, onMoveDown }) => (
  <ol className="task-list">
    {taskList.map((task, index) => (
      <TaskItem
        key={index}
        task={task}
        index={index}
        onDelete={onDelete}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
      />
    ))}
  </ol>
);

export default TaskListDisplay;
