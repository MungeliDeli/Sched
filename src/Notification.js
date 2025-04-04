const scheduleNotifications = (tasks) => {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    console.warn("Notifications are not allowed.");
    return;
  }

  tasks.forEach((task) => {
    if (!task || !task.title || !task.time) {
      console.warn("Invalid task data:", task);
      return;
    }

    const now = new Date();
    const taskStartTime = new Date();

    const parseTime = (timeStr) => {
      if (!timeStr) return { hours: 0, minutes: 0 };
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;
      return { hours, minutes };
    };

    const startTimeString = task.time?.split(" - ")[0];
    const { hours, minutes } = parseTime(startTimeString);

    taskStartTime.setHours(hours, minutes - 10, 0);

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
