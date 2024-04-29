// src/util/fontSizeHandler.tsx
import React, { useEffect } from "react";

interface FontSizeHandlerProps {
  size: number;
}

const FontSizeHandler: React.FC<FontSizeHandlerProps> = ({ size }) => {
  useEffect(() => {
    // Apply the font size to the root element or a specific element
    document.documentElement.style.setProperty("--font-size", `${size}px`);

    // Optional: Save the font size to localStorage
    localStorage.setItem("fontSize", size.toString());
  }, [size]);

  // This component does not render anything
  return null;
};

export default FontSizeHandler;
