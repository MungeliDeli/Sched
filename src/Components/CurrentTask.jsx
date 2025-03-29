import React, { useState, useEffect } from "react";
import "./CurrentTask.css";
import Task from "./Task";

const CurrentTask = ({ tasks }) => {
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const checkCurrentTask = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();

      // Convert time string "HH:MM AM/PM" to a comparable 24-hour format
      const parseTime = (timeStr) => {
        const [time, modifier] = timeStr.split(" ");
        let [hours, minutes] = time.split(":").map(Number);
        if (modifier === "PM" && hours !== 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;
        return { hours, minutes };
      };

      // Find the ongoing task
      const activeTask = tasks.find((task) => {
        const [start, end] = task.time.split(" - ").map(parseTime);
        return (
          (currentHour > start.hours ||
            (currentHour === start.hours && currentMinutes >= start.minutes)) &&
          (currentHour < end.hours ||
            (currentHour === end.hours && currentMinutes <= end.minutes))
        );
      });

      setCurrentTask(activeTask || null);
    };

    checkCurrentTask(); // Run immediately
    const interval = setInterval(checkCurrentTask, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <section className="current-task">
      {currentTask ? (
        <div
          className="task-card"
          style={{ backgroundColor: currentTask.color }}
        >
        <h3>Current Task</h3>
         <Task task={currentTask} />
        </div>
      ) : (
        <p className="no-task">No ongoing task at the moment.</p>
      )}
    </section>
  );
};

export default CurrentTask;
