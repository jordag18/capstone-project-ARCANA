/**
 * Component that renders font size buttons and handles font size changes.
 */
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FontSizeHandler from "../util/fontSizeHandler";

const FontSizeButtons: React.FC = () => {
  const [fontSize, setFontSize] = useState<number>(
    parseInt(localStorage.getItem("fontSize") || "18", 10)
  ); // Default font size

  const handleFontSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSize = parseInt(event.target.value, 10);
    if (!isNaN(newSize) && newSize > 0) {
      setFontSize(newSize);
    }
  };

  const incrementFontSize = () => {
    setFontSize(fontSize + 2);
  };

  const decrementFontSize = () => {
    setFontSize(fontSize - 2);
  };

  return (
    <>
      <hr />
      <br />
      <p>Current Font Size: {fontSize}</p>
      <div className="input-group mb-3">
        <Button variant="outline-danger" onClick={decrementFontSize}>
          Decrease Font Size
        </Button>

        <Form.Select
          id="font-size-selector"
          aria-label="Font size selector"
          value={fontSize.toString()}
          onChange={handleFontSizeChange}>
          {Array.from({ length: 33 }, (_, index) => (
            <option key={index} value={index * 2 + 8}>
              {index * 2 + 8}
            </option>
          ))}
        </Form.Select>

        <Button variant="outline-primary" onClick={incrementFontSize}>
          Increase Font Size
        </Button>

        <FontSizeHandler size={fontSize} />
      </div>
    </>
  );
};

export default FontSizeButtons;
