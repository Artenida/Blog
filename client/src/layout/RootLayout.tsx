import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";


function RootLayout ( ){
    return (
      <React.Fragment>
        <div className="root-layout">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </React.Fragment>
    )
}

export default RootLayout