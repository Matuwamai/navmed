import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet from react-router-dom
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar at the top */}
      <Navbar />
      
      <div className="flex flex-1">
        {/* Sidebar on the left */}
        <Sidebar />
        
        {/* Main content area where other pages will render */}
        <div className="flex-1 p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
