/**
 * Represents a component that allows the user to switch between light and dark color modes.
 */
import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import SaveSuccessMessage from "../ui/saveSuccessMessage";
import AltSaveSuccessMessage from "../ui/altSaveSuccessMessage";

interface ColorModeSwitcherProps {
  toggleColorMode: () => void;
}

export function getSystemTheme(): string {
  if (typeof window !== "undefined") {
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDarkMode ? "dark" : "light";
  }
  return "light"; // Default value
}

const ThemeSwitcher: React.FC<ColorModeSwitcherProps> = () => {
  const [colorMode, setColorMode] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("colorMode");
      return storedTheme ? storedTheme : getSystemTheme();
    }
    return getSystemTheme();
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-bs-theme", colorMode);
      localStorage.setItem("colorMode", colorMode);
    }
  }, [colorMode]);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMode = event.target.value;
    setColorMode(newMode);
  };

  return (
    <>
      <br />
      <p className="col-form-label fw-semibold m-1">
        Current Theme: {colorMode}
      </p>
      <Form>
        <Col sm={12} className="col-sm-2">
          <FloatingLabel
            controlId="floatingSelect"
            label="Set Theme"
            className="m-1 p-1">
            <Form.Select
              aria-label="Floating label select example"
              value={colorMode}
              onChange={handleSelect}>
              <option className="m-2" value="light">
                Light
              </option>
              <option value="dark">Dark</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Form>
      <SaveSuccessMessage />
      <AltSaveSuccessMessage />
    </>
  );
};
export default ThemeSwitcher;
