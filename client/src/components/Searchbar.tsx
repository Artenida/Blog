import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Account from "./Account";
import { words } from '../assets/data';

const Searchbar = () => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="hidden md:flex justify-between align-center items-center md:space-x-4">
      <form action="" className=" relative">
        <input type="text" placeholder="Search" className={`w-[300px] py-2 px-2 rounded-full
            bg-transparent border ${isFocused ? "border-custom-color3" : "border-custom-color2"} focus:outline-none`}
            onFocus={handleFocus} onBlur={handleBlur}/>
        <button className="text-custom-color2 absolute right-1 top-1/2 -translate-y-1/2 bg-sate-900 rounded-full px-2">
          <FaSearch />
        </button>
      </form>
      <Account />
    </div>
    
  );
};

export default Searchbar;
