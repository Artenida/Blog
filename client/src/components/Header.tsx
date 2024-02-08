// import React from "react";
import Account from './Account';
import Logo from '../components/Logo';
import Navbar from './Navbar';
import Searchbar from "./Searchbar";


const Header = () => {
    return (
      <header className='flex gap-14 items-center px-12'>
        <Logo />
        <Navbar />
        <Searchbar />
      </header>
    ) 
}

export default Header;