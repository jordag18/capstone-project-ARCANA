import React from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function SyncRequestAcknowledgedAlert() {
  const [show, setShow] = React.useState(true);
  if (show) {
    return (
      <Alert variant="success" onClose={() => setShow(true)} dismissible>
        <strong>Success: </strong>
        The sync request was acknowledged.
      </Alert>
    );
  }
  return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}
export default SyncRequestAcknowledgedAlert;
