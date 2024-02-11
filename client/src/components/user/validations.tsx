// validations.ts

interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  
  interface ValidationErrors {
    [key: string]: string;
  }
  
  export function validateSignUp(formData: FormData): ValidationErrors {
    const errors: ValidationErrors = {};
  
    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }
  
    if (!formData.email.trim()) {
      errors.email = "Email is not valid";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is not valid";
    }
  
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password should be at least 6 characters";
    }
  
    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Password not matched";
    }
  
    return errors;
  }
  
  export function validateSignIn(formData: FormData): ValidationErrors {
    const errors: ValidationErrors = {};
  
    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }
  
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }
  
    return errors;
  }
  