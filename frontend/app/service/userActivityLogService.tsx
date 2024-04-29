"use client";
import axios from "axios";

interface UserActivityLog {
  initials: string;
  timestamp: string;
  logEntry: string;
}

export async function addUserActivityLog(
  userActivity: UserActivityLog
): Promise<void> {
  try {
    await axios.post("/api/userActivityLog", {
      initials: userActivity.initials,
      timestamp: userActivity.timestamp,
      log_entry: userActivity.logEntry,
    });
    console.log("Log entry added successfully");
  } catch (error) {
    console.error("Error adding log entry:", error);
    throw new Error("Failed to add log entry");
  }
}
