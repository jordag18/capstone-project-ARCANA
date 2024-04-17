import Card from "react-bootstrap/Card";
import React, { useState, useEffect } from 'react';
import ActivityLogErrorAlert from "@/app/ui/activityLogErrorAlert";

interface Log {
  initials: string;
  timestamp: Date;
  datasource?: string;
  log: string;
}

function UserLogTable() {
  const [userActivityLog, setUserActivityLog] = useState<Log[]>([]);

  useEffect(() => {
    const fetchUserActivityList = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/userActivityLog');
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        const activityData: [] = await response.json(); // Type assertion
        setUserActivityLog(activityData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserActivityList();
  }, []);

  return (
    <>
      <Card style={{ overflow: "auto", height: "800px" }}>
        <div className="flex-fluid align-content-center justify-content-center">
          <div>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Initials</th>
                  <th>Time Stamp</th>
                  <th>Source</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {userActivityLog.map((log, index) => (
                  <tr key={index}>
                    <td>{log.initials}</td>
                    <td>
                        {log.timestamp
                          ? new Date(log.timestamp).toLocaleString()
                          : "N/A"}
                      </td>
                    <td>{log.datasource}</td>
                    <td>{log.log}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
      <div className="p-2">
        <ActivityLogErrorAlert />
      </div>
    </>
  );
}

export default UserLogTable;