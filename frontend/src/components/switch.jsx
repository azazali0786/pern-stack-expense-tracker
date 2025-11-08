import React from "react";
import { IoMoonOutline } from "react-icons/io5";
import { LuSunMoon } from "react-icons/lu";
import useStore from "../store";

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useStore((state) => state);

  return (
    <button 
      onClick={toggleTheme} 
      className="outline-none p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <LuSunMoon size={26} className="text-yellow-500" />
      ) : (
        <IoMoonOutline size={26} className="text-blue-600" />
      )}
    </button>
  );
};

export default ThemeSwitch;