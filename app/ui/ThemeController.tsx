"use client";
import React, { useState, useEffect } from "react";

const ThemeController = () => {
  const [isLight, setIsLight] = useState(false); // Default to false

  useEffect(() => {
    // This will only run on the client side
    const storedValue = localStorage.getItem("isLight");
    setIsLight(storedValue !== null ? JSON.parse(storedValue) : false);
  }, []);

  useEffect(() => {
    // This will only run on the client side
    localStorage.setItem("isLight", JSON.stringify(isLight));
  }, [isLight]);

  return (
    <div>
      <label className="flex cursor-pointer gap-2">
        <span className="label-text">Dark</span>
        <input
          type="checkbox"
          checked={isLight}
          value="light"
          className="toggle theme-controller"
          onChange={() => setIsLight(!isLight)}
        />
        <span className="label-text">Light</span>
      </label>
    </div>
  );
};

export default ThemeController;
