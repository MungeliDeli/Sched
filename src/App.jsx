import React, { useState } from "react";
import "./App.css"
  import { useEffect } from "react";
import scheduleNotifications from "./Notification";
import Header from "./Components/Header";
import TaskList from "./Components/TaskList ";
import DosAndDonts from "./Components/DosAndDonts";
import CurrentTask from "./Components/CurrentTask";
import dailySchedule from "./Data/data";
const App = () => {
  // Get the current day (e.g., "Monday")
  const currentDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  // Retrieve the schedule for the current day, or an empty schedule if none exists
  const scheduleForToday = dailySchedule[currentDay] || {
    tasks: [],
    guidelines: { dos: [], donts: [] },
  };
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    // Additional logic to apply the theme can be implemented here
  };

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.warn(
          "Notifications are disabled. Please enable them in settings."
        );
      }
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    scheduleNotifications(scheduleForToday.tasks);
  }, [scheduleForToday.tasks]);

  return (
    <div id="app" className={isDarkTheme ? "dark-theme" : "light-theme"}>
      <Header day={currentDay} toggleTheme={toggleTheme} />
      <CurrentTask tasks={scheduleForToday.tasks} />

      <DosAndDonts />

      {scheduleForToday.tasks.length > 0 ? (
        <TaskList tasks={scheduleForToday.tasks} />
      ) : (
        <p>No tasks scheduled for today.</p>
      )}
    </div>
  );
};

export default App;
