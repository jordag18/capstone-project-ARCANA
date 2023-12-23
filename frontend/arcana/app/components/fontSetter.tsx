import React from "react";
import Card from "react-bootstrap/Card";
import FontSizeChanger from "../components/fontSizer";

export function FontSizeSetter() {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title> <h2>Font Size</h2> </Card.Title>
          <Card.Text>
            <p>Specify the size of the font in the GUI.</p>
          </Card.Text>
          <div className="text-center align-middle">
            <FontSizeChanger />
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
export default FontSizeSetter;
