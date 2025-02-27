import React from "react";
import { FaUserCircle } from "react-icons/fa";


interface NavbarProps {
  adminName: string;
}

const Navbar: React.FC<NavbarProps> = ({ adminName }) => {
  return (
    <nav className="bg-none text-blue-600 flex justify-between m-2 border-solid border-3 border-blue-600 rounded-sm items-center p-4 shadow-sm ">
      {/* Left Side - Logo & Name */}
      <div className="flex items-center gap-3">
        <img src='/logo.png' alt="" className="h-15 w-15" />
        <h1 className="text-xl font-bold">Navmed</h1>
      </div>

      {/* Right Side - Admin Name & Icon */}
      <div className="flex items-center gap-3">
        <span className="font-semibold">{adminName}</span>
        <FaUserCircle size={24} />
        <h1 className="text-xl font-bold">Admin</h1>
      </div>
    </nav>
  );
};

export default Navbar;
