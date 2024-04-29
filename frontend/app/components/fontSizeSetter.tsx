/**
 * Renders a component that allows the user to set the font size in the GUI.
 * @returns The FontSizeSetter component.
 */
import React from "react";
import Card from "react-bootstrap/Card";
import FontSizeButtons from "./fontSizeButtons";

export function FontSizeSetter() {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>
            {" "}
            <h2>Font Size</h2>
            <hr />{" "}
          </Card.Title>
          <Card.Text>
            <p>Specify the size of the font in the GUI.</p>
            <p>[Default: 18]</p>
          </Card.Text>
          <div className="text-center align-middle">
            <FontSizeButtons />
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
export default FontSizeSetter;
