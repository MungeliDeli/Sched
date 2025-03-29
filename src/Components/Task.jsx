import React from "react";
import "./Task.css";

const Task = ({ task }) => {
  return (
    <div className="task" style={{ backgroundColor: task.color }}>
      <img src={task.img} alt="task image" />
      <div >
        <h3>{task.name}</h3>
        <p>{task.time}</p>
      </div>
    </div>
  );
};

export default Task;
