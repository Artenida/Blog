import React, { useState, ChangeEvent, FormEvent } from "react"; // Import necessary types
import { Link } from "react-router-dom";
// import useHistory from 'react-router-dom';
import { validateSignUp } from "./validations";
import { validateSignIn } from "./validations";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Inputs {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  label: string;
}

interface FormProp {
  formProp: {
    title: string;
    name: string;
    inputs: Inputs[];
  };
}

const FormComponent = ({ formProp }: FormProp) => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({}); // Initialize errors state

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let validationErrors: Partial<FormData> = {};

    if (formProp.name === "signUp") {
      validationErrors = validateSignUp(formData);
    } else {
      validationErrors = validateSignIn(formData);
    }

    const errorKeys = Object.keys(
      validationErrors
    ) as (keyof Partial<FormData>)[];

    if (Object.keys(validationErrors).length > 0) {
      let errorMessage = "Please fix the following errors:\n";
      Object.values(validationErrors).forEach((error) => {
        errorMessage += `- ${error}\n`;
      });
      alert(errorMessage);
    } else {
      if (formProp.name === "signUp") {
        alert("Form submitted successfully!");
      } else {
        alert("You are logged in");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-custom-color2">
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="p-6 shadow-lg bg-custom-color1 rounded-md">
          <h1 className="text-3xl block text-center font-semibold text-custom-color3 items-center mt-3">
            {formProp.title}
          </h1>
          <hr className="mt-3" />
          {formProp.inputs.map((input) => (
            <div key={input.id} className="mt-3">
              <label className="block text-base mb-2" htmlFor={input.id}>
                {input.label}
              </label>
              <input
                className="border border-custom-color2 w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-custom-color3"
                key={input.id}
                type={input.type}
                id={input.id}
                name={input.name}
                placeholder={input.placeholder}
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="mt-3 flex justify-center items-center">
            <p className="regular-font mt-2">
              {formProp.name === "signIn" ? (
                <>
                  <label htmlFor={formProp.name}>
                    Don't have an account?{" "}
                    <span className="text-custom-color3 font-semibold">
                      <Link to="/signUp">Register</Link>
                    </span>
                  </label>

                  <button
                    className="mt-2 border-2 border-custom-color3 bg-custom-color3 
  text-white py-2 w-full hover:bg-transparent hover:text-custom-color3 
  font-semibold rounded-md flex justify-center items-center"
                    type="submit"
                  >
                    Login
                  </button>
                </>
              ) : (
                <>
                  <label htmlFor={formProp.name}>
                    Already part of us?{" "}
                    <span className="text-custom-color3 font-semibold">
                      <Link to="/signIn">Login</Link>
                    </span>
                  </label>

                  <button
                    className="mt-2 border-2 border-custom-color3 bg-custom-color3 
  text-white py-2 w-full hover:bg-transparent hover:text-custom-color3 
  font-semibold rounded-md flex justify-center items-center"
                    type="submit"
                  >
                    Register
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
