import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

interface ColorModeSwitcherProps {
    toggleColorMode: () => void;
}

const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = () => {
  const [colorMode, setColorMode] = useState<string>('light');

  const handleSelect = (eventKey: string | null) => {
    const newMode = eventKey === 'dark' ? 'dark' : 'light';
    setColorMode(newMode);
    document.documentElement.setAttribute('data-bs-theme', newMode);
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        Color Mode
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="light">Light Mode</Dropdown.Item>
        <Dropdown.Item eventKey="dark">Dark Mode</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ColorModeSwitcher;
