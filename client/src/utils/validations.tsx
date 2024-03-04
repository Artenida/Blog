interface FormRegisterErrors {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormLoginErrors {
  username: string;
  password: string;
}

interface FormUpdateErrors {
  username: string;
  email: string;
  bio: string;
  password: string;
}

const validateUsername = (value: string): string => {
  return value.trim() ? "" : "Username is required";
};

const validateEmail = (value: string): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? "" : "Invalid email format";
};

const validateBio = (value: string): string => {
  return value.trim().length <= 30 ? "" : "Bio must be at most 100 characters";
};

const validatePassword = (value: string): string => {
  if (!value.trim()) {
    return "Password is required";
  } else if (value.length < 8) {
    return "Password must be at least 8 characters";
  }
  return "";
};

const validateConfirmPassword = (value: string, password: string): string => {
  if (!value.trim()) {
    return "Confirm Password is required";
  } else if (value !== password) {
    return "Passwords do not match";
  }
  return "";
};

export const validateRegisterForm = (
  id: string,
  value: string,
  formData: FormRegisterErrors
): FormRegisterErrors => {
  let errors: FormRegisterErrors = { ...formData };

  if (id === "username") {
    errors.username = validateUsername(value);
  }
  if (id === "email") {
    errors.email = validateEmail(value);
  }
  if (id === "password") {
    errors.password = validatePassword(value);
  }
  if (id === "confirmPassword") {
    if (value.trim()) {
      errors.confirmPassword = validateConfirmPassword(
        value,
        formData.password
      );
    } else {
      errors.confirmPassword = "";
    }
  }
  return errors;
};

export const validateLoginForm = (
  id: string,
  value: string,
  formData: FormLoginErrors
): FormLoginErrors => {
  let errors: FormLoginErrors = { ...formData };

  if (id === "username") {
    errors.username = validateUsername(value);
  }
  if (id === "password") {
    errors.password = validatePassword(value);
  }
  return errors;
};

export const validateUpdateForm = (
  id: string,
  value: string,
  formData: FormUpdateErrors
): FormUpdateErrors => {
  let errors: FormUpdateErrors = { ...formData };

  if (id === "username") {
    errors.username = validateUsername(value);
  }
  if (id === "email") {
    errors.email = validateUsername(value);
  }
  if (id === "bio") {
    errors.bio = validateBio(value);
  }
  if (id === "password") {
    errors.password = validatePassword(value);
  }
  return errors;
};
