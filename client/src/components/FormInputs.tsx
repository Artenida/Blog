import React from "react";

interface FormInputProps {
  id: string;
  type?: string;
  label: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  value?: string | number | undefined;
}

const FormInputs: React.FC<FormInputProps> = ({
  id,
  label,
  placeholder,
  type,
  value,
  icon,
  onChange,
}) => {
  return (
    <div className="mt-3" style={{ zIndex: 0 }}> {/* Set a lower z-index */}
      <div className="flex items-center align-center gap-1 pl-1">
        {icon}
        <label htmlFor={id} className="font-semibold text-custom-color3 pl-1">
          {label}
        </label>
      </div>
      <input
        autoComplete="off"
        type={type}
        placeholder={placeholder}
        id={id}
        className="mt-2 border border-custom-color2 px-3 py-2 rounded-md focus:outline-none focus:border-custom-color3 w-full"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default FormInputs;
