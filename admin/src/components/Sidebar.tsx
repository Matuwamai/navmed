import React from "react";
import { FaBox, FaPlusCircle, FaUsers, FaSignOutAlt, FaShoppingCart } from "react-icons/fa"; 
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-blue-600 text-white flex flex-col p-5">
      {/* Sidebar Header */}
      <h1 className="text-2xl font-bold text-center mb-5">Navmed</h1>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4">
        <Link to="/orders" className="flex items-center gap-3 p-2 hover:bg-blue-500 rounded-lg">
          <FaShoppingCart size={20} /> Orders
        </Link>
        
        <Link to="/products" className="flex items-center gap-3 p-2 hover:bg-blue-500 rounded-lg">
          <FaBox size={20} /> Products
        </Link>

        <Link to="/create-product" className="flex items-center gap-3 p-2 hover:bg-blue-500 rounded-lg">
          <FaPlusCircle size={20} /> Create Product
        </Link>

        <Link to="/users" className="flex items-center gap-3 p-2 hover:bg-blue-500 rounded-lg">
          <FaUsers size={20} /> Users
        </Link>

        <Link to="/logout" className="flex items-center gap-3 p-2 hover:bg-red-500 rounded-lg mt-auto">
          <FaSignOutAlt size={20} /> Logout
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
