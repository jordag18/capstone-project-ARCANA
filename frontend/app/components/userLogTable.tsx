import React, { useState, useEffect } from "react";
import ActivityLogErrorAlert from "@/app/ui/activityLogErrorAlert";

interface Log {
  initials: string;
  timestamp: Date;
  statement: string;
}

function UserLogTable() {
  const [userActivityLog, setUserActivityLog] = useState<Log[]>([]);

  useEffect(() => {
    const fetchUserActivityList = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/userActivityLog"
        );
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }
        const activityData: Log[] = await response.json(); // Type assertion
        setUserActivityLog(activityData.reverse()); // Reverse the array
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserActivityList();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center overflow-auto rounded-lg">
        <div>
          <table className="table w-full">
            <thead className="bg-slate-300 border-b-2 border-slate-500">
              <tr>
                <th className="border-r-2 border-slate-200">Initials</th>
                <th className="border-r-2 border-slate-200">Time Stamp</th>
                <th className="border-r-2 border-slate-200">Description</th>
              </tr>
            </thead>
            <tbody className="bg-base-200">
              {userActivityLog.map((log, index) => (
                <tr key={index}>
                  <td>{log.initials}</td>
                  <td>
                    {log.timestamp
                      ? new Date(log.timestamp).toLocaleString()
                      : "N/A"}
                  </td>
                  <td>{log.statement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default UserLogTable;
