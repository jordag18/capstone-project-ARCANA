import Card from "react-bootstrap/Card";
import React, { useState, useEffect } from 'react';
import ActivityLogErrorAlert from "@/app/ui/activityLogErrorAlert";


function UserLogTable() {
  const [userActivityLog, setUserActivityLog] = useState([]);

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
          <ul>
            {userActivityLog.map((log, index) => (
              <ol key={index}>{log}</ol>
            ))}
          </ul>
        </div>
      </Card>
      <div className="p-2">
        <ActivityLogErrorAlert/>
      </div>
    </>
  );
}

export default UserLogTable;