/**
 * Renders a component for setting the GUI theme.
 * @returns The GUI theme setter component.
 */
import React from "react";
import Card from "react-bootstrap/Card";
import ThemeSwitcher from "./themeSetter";

export function GuiThemeSetter() {
  return (
    <div>
      <Card className="align-center">
        <Card.Body>
          <Card.Title>
            {" "}
            <h2>GUI Theme</h2>{" "}
          </Card.Title>
          <Card.Text>
            <hr />
            <p className="m-0">Specify the theme color.</p>
            <p className="m-0">
              This will change the size of the font in the user interface (GUI).
            </p>
            <br />
            <p>
              {" "}
              <strong> Light: </strong>&emsp;[White background | Black text]{" "}
            </p>
            <p>
              {" "}
              <strong> Dark: </strong>&emsp;[Dark Grey background | White text]{" "}
            </p>
            <hr />
          </Card.Text>
          <div className="text-center align-middle mb-auto">
            <ThemeSwitcher
              toggleColorMode={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
export default GuiThemeSetter;
