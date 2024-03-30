import React from "react";
import Searchbar from "./Searchbar";

const Banner = () => {
    return (
        <div className="px-4 py-32 bg-custom-color3 mx-auto">
            <div className="text-custom-color1 text-center">
                <h1 className="text-5xl lg:text-7xl leading-snug
                font-bold mb-5">Welcome to Our Blog</h1>
                <p className="text-custom-color2 lg:w-3/5 mx-auto mb-5 font-primary">
                    Start your blog today and join a community of photographers
                    who are passionate about sharing their stories and ideas.
                </p>
            </div>
            {/* <Searchbar /> */}
        </div>
    )
}

export default Banner;