import React from "react";
import { NavLink, Routes } from "react-router-dom";

const Navbar = () =>  {
    return (
      <React.Fragment>
        <section>
          <div>
            <div>
              <div>
                <NavLink to="/">Home</NavLink>
                <NavLink to="about">About</NavLink>
                <NavLink to="contact">Contact</NavLink>
                <NavLink to="signIn">Sign In</NavLink>
                <NavLink to="signUp">Sign Up</NavLink>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
}

export default Navbar;