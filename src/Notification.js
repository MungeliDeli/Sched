const scheduleNotifications = (tasks) => {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    console.warn("Notifications are not allowed.");
    return;
  }

  tasks.forEach((task) => {
    const now = new Date();
    const taskStartTime = new Date();

    // Convert "HH:MM AM/PM" to Date object
    const parseTime = (timeStr) => {
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;
      return { hours, minutes };
    };

    const { hours, minutes } = parseTime(task.time.split(" - ")[0]); // Get start time
    taskStartTime.setHours(hours, minutes - 10, 0); // Set time 10 mins before task

    const timeUntilNotification = taskStartTime - now;

    if (timeUntilNotification > 0) {
      setTimeout(() => {
        new Notification("Upcoming Task", {
          body: `Your task "${task.title}" starts in 10 minutes!`,
          icon: "/icons/pwa-192x192.png",
        });
      }, timeUntilNotification);
    }
  });
};

export default scheduleNotifications;
