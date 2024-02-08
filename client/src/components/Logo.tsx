// import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo3.webp';

const Logo = () => {
    return (
      <div>
          <div className="flex justify-center align-center items-center cursor-pointer">
            <Link to="/"><img src={logo} alt="" style={{ width: '100%', height: '50px' }}/></Link>
            <Link to="/"><h1 className="font-playfairDisplay text-xl text-custom-color3 font-bold cursor-pointer py-1">Shutter<span className="text-3xl">S</span>cene</h1></Link>
          </div>
      </div>
    ) 
}

export default Logo;