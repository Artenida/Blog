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
  profile_picture: string;
}

const validateUsername = (value: string): string => {
  if (!value.trim()) {
    return "Username is required";
  } else if (value.length > 16) {
    return "Username must be at most 16 characters";
  }
  return "";
};

const validateEmail = (value: string): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? "" : "Email format isn't valid";
};

const validateBio = (value: string): string => {
  return value.trim().length <= 30 ? "" : "Bio must be at most 30 characters";
};

const validatePassword = (value: string): string => {
  if (!value.trim()) {
    return "Password is required";
  } else if (value.length < 8) {
    return "Password must be at least 8 characters";
  }
  return "";
};

export const validateRegisterForm = (
  id: string,
  value: string,
  formData: FormRegisterErrors,
): FormRegisterErrors => {
  let errors: FormRegisterErrors = { ...formData };

  if (id === "username") {
    errors.username = validateUsername(value);
  } else if (id === "email") {
    errors.email = validateEmail(value);
  } else if (id === "password") {
    errors.password = validatePassword(value);
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
    errors.email = validateEmail(value);
  }
  if (id === "bio") {
    errors.bio = validateBio(value);
  }
  if (id === "password") {
    errors.password = validatePassword(value);
  }
  return errors;
};
