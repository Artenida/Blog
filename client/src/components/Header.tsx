// import React from "react";
import Account from './Account';
import Logo from './Logo';
import Navbar from './Navbar';
import Searchbar from "./Searchbar";


const Header = () => {
    return (
      <header className='flex items-center px-12'>
        <Logo />
        <Navbar />
        <div className='md:flex justify-center align-center gap-2 '>
        <Searchbar />
        </div>
      </header>
    ) 
}

export default Header;