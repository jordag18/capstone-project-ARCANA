import React from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function ActivityLogErrorAlert() {
  const [show, setShow] = React.useState(true);
  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(true)} dismissible>
        <strong>Error: </strong>
        Unable to load user activity logs. Please refresh to try again.
      </Alert>
    );
  }
  return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}
export default ActivityLogErrorAlert;
