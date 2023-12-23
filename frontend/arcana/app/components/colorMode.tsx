"use client";
import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";

interface ColorModeSwitcherProps {
  toggleColorMode: () => void;
}

export function getSystemTheme(): string {
  if (typeof window !== 'undefined') {
    const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDarkMode ? "dark" : "light";
  }
  return 'light'; // Default value
}

const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = () => {
  const [colorMode, setColorMode] = useState<string>(() => {
    const storedTheme = localStorage.getItem("colorMode");
    return storedTheme ? storedTheme : getSystemTheme();
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", colorMode);
    localStorage.setItem("colorMode", colorMode);
  }, [colorMode]);

  const handleSelect = (eventKey: string | null) => {
    const newMode = eventKey === "dark" ? "dark" : "light";
    setColorMode(newMode);
  };

  return (
    <Form>
      <Form.Group as={Row} className="text-start" controlId="formThemeSet">
        <Col>
          <Form.Label column className="fw-semibold">
            Current Theme: {colorMode}
          </Form.Label>
          <FloatingLabel controlId="floatingSelect" label="Set Theme">
            <Form.Select
              aria-label="ThemeSetOptions selection"
              onChange={(event) => handleSelect(event.target.value)}
              value={colorMode}
            >
              <option value="light">Light Mode</option>
              <option value="dark">Dark Mode</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default ColorModeSwitcher;
