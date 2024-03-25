import { value } from "@material-tailwind/react/types/components/chip";
import React from "react";

interface FormInputProps {
  id: string;
  type?: string;
  label: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  name?: string;
  value?: string | number | undefined;
  errorMessage?: string;
  updateValue?: (value: string) => void;
}

const FormInputs: React.FC<FormInputProps> = ({
  id,
  label,
  placeholder,
  type,
  value,
  icon,
  name,
  onChange,
  errorMessage,
  updateValue
}) => {
  return (
    <div className="mt-3 h-20">
      <div className="flex items-center align-center gap-1 pl-1 mt-5">
        {icon}
        <label htmlFor={id} className="font-semibold text-custom-color3 pl-1">
          {label}
        </label>
      </div>
      <div className="">
      <input
        autoComplete="off"
        type={type}
        placeholder={placeholder}
        id={id}
        className="mt-2 border border-custom-color2 px-3 py-2 rounded-md focus:outline-none focus:border-custom-color3 w-full h-10"
        onChange={onChange}
        value={value}
        name={name}
        />
      </div>
     
      <span
        className={`text-sm text-red-600 pl-1 pt-1${
          errorMessage ? "block" : "hidden"
        } h-4`}
      >
        {errorMessage}
      </span>
    </div>
  );
};
export default FormInputs;
