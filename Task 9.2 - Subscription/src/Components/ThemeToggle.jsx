import React, { useState } from 'react';
import { useTheme } from './ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();  // Access the theme and toggle function
  const [isHovered, setIsHovered] = useState(false);  // State to track hover status

  const buttonStyle = {
    backgroundColor: isHovered ? theme.buttonHoverBackground : theme.buttonBackground,
    color: isHovered ? theme.buttonHoverText : theme.buttonText,
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, color 0.3s ease',  // Smooth transition
  };

  return (
    <button
      onClick={toggleTheme}
      style={buttonStyle}
      onMouseEnter={() => setIsHovered(true)}  // Set hover state to true on mouse enter
      onMouseLeave={() => setIsHovered(false)}  // Set hover state to false on mouse leave
    >
      Switch Theme
    </button>
  );
};

export default ThemeToggle;




