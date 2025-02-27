import React, { useState } from "react";
import { FaBox, FaPlusCircle, FaUsers, FaUserPlus, FaSignOutAlt, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa"; 
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        alert("Logged out successfully!");
        navigate("/login");
      } else {
        alert("Logout failed!");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred while logging out.");
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-0 left-5 z-50 text-white bg-blue-600 p-2 rounded-lg md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
      </button>

      {/* Sidebar */}
      <div className={`h-screen w-64 bg-blue-600 text-white flex flex-col p-5 fixed top-0 left-0 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative`}>
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

          <Link to="/create-admin" className="flex items-center gap-3 p-2 hover:bg-green-500 rounded-lg">
            <FaUserPlus size={20} /> Create User
          </Link>

          <button 
            onClick={handleLogout} 
            className="flex items-center gap-3 p-2 hover:bg-red-500 rounded-lg mt-auto"
          >
            <FaSignOutAlt size={20} /> Logout
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
