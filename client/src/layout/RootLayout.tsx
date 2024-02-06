import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function RootLayout ( ){
    return (
      <React.Fragment>
        <div className="root-layout">
          <Navbar />
          
          <Outlet />
        </div>
      </React.Fragment>
    )
}

export default RootLayout