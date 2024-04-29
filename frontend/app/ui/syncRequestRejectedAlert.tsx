import React from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function SyncRequestRejectedAlert() {
  const [show, setShow] = React.useState(true);
  if (show) {
    return (
      <Alert variant="warning" onClose={() => setShow(false)} dismissible>
        <strong>Success: </strong>
        The sync request was rejected.
      </Alert>
    );
  }
  return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}
export default SyncRequestRejectedAlert;
