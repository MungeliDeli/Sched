import React from "react";
import Task from "./Task";
import "./TaskList.css"

const TaskList = ({ tasks }) => {
  return (
    <section className="tasklist">
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </section>
  );
};

export default TaskList;
