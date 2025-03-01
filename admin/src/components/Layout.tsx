import React from "react";
import { Outlet } from "react-router-dom"; //
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex">
      
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};


export default Layout;
