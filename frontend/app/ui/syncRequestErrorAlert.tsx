import React from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function SyncRequestErrorAlert() {
  const [show, setShow] = React.useState(true);
  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(true)} dismissible>
        <strong>Error: </strong>
        All projects must be deselected to reject all.
      </Alert>
    );
  }
  return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}
export default SyncRequestErrorAlert;
