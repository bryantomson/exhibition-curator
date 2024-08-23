import React from "react";
import ThemeController from "./ThemeController";

const NavBar = () => {
  return (
    <div className="navbar bg-base-100 mt-5">
      <div className="flex items-center">
        <a href="/" className="btn btn-ghost text-5xl">Curate.</a>
        <div className="ml-6">
          <ThemeController />
        </div>
      
      </div>
    
    </div>
  );
};

export default NavBar;
