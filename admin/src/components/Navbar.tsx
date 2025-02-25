import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white flex justify-between items-center p-4 shadow-md">
      {/* Left Side - Logo & Name */}
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="Navmed Logo" className="h-10" />
        <h1 className="text-xl font-bold">Navmed</h1>
      </div>

      {/* Right Side - Admin Icon & Name */}
      <div className="flex items-center gap-3">
        <FaUserCircle size={24} />
        <span className="font-semibold">Admin</span>
      </div>
    </nav>
  );
};

export default Navbar;
