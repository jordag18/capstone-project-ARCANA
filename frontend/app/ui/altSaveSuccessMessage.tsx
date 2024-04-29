import React from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function AltSaveSuccessMessage() {
  const [show, setShow] = React.useState(true);
  if (show) {
    return (
      <Alert variant="light" onClose={() => setShow(true)} dismissible>
        <strong>Success: </strong>
        Default color scheme saved
      </Alert>
    );
  }
  return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}
export default AltSaveSuccessMessage;
