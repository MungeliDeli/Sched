import React from "react";
import "./Header.css";
import sched from "../assets/sched.png";
import light from "../assets/light.png";
import dark from "../assets/dark.png";

import { useTheme } from "../ThemeContext.jsx";

const Header = ({ day }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header>
      <div className="sec-1">
        <img className="logo" src={sched} alt="App Logo" />
        <h1>{day}</h1>
      </div>
      <button className="togglebtn" onClick={toggleTheme}>
        <img src={theme === "light" ? dark : light} alt="togle light" />
      </button>
    </header>
  );
};

export default Header;
