import React, { ReactNode } from "react";

interface ButtonProps {
    children?: ReactNode; // Make children prop optional
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    return (
        <button className="hidden md:block w-full rounded bg-custom-color3 
            px-8 py-3 text-xl font-medium text-custom-color1
            hover:bg-custom-color1 hover:text-custom-color3 hover:border-2 
            hover:border-custom-color3 active:bg-custom-color1 sm:w-auto">
            {props.children}
        </button>
    )
}

export default Button;
