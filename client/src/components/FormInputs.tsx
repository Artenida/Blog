import React from 'react';

interface FormInputProps {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode; // New prop for the icon
}

const FormInputs: React.FC<FormInputProps> = ({ id, label, placeholder, type, icon, onChange }) => {
  return (
    <div className="mt-3">
      <div className="flex items-center align-center gap-1">
      {icon}
        <label htmlFor={id} className="font-semibold text-custom-color3">
          {label}
        </label>
      </div>
      <input
        autoComplete="off"
        type={type}
        placeholder={placeholder}
        id={id}
        className="mt-2 border border-custom-color2 px-3 py-2 rounded-md focus:outline-none focus:border-custom-color3 w-[350px]"
        onChange={onChange}
      />
    </div>
  );
};

export default FormInputs;
