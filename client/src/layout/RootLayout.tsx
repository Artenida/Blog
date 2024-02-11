import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


function RootLayout ( ){
    return (
      <React.Fragment>
        <div className="root-layout">
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      </React.Fragment>
    )
}

export default RootLayout