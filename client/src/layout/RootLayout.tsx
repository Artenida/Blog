import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function RootLayout ( ){
    return (
        <div className="root-layout">
            <header>
                <nav>
                    <h1>Navbar</h1>
                    <NavLink to="home">Home</NavLink>
                    <NavLink to="about">About</NavLink>
                    <NavLink to="contact">Contact</NavLink>
                    <NavLink to="signIn">Sign In</NavLink>
                    <NavLink to="signUp">Sign Up</NavLink>
                    {/* <NavLink to="about">About</NavLink> */}
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    )
}

// export default RootLayout