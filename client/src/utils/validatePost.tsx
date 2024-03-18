interface CreatePost {
  title: string;
  description: string;
  tags: string;
  file: string;
}

const validateTitle = (value: string): string => {
  if (!value.trim()) {
    return "Title is required";
  }
  return "";
};

const validateDescription = (value: string): string => {
  if (!value.trim()) {
    return "Description is required";
  }
  return "";
};

export const validateTags = (tags: string[]): string => {
  if (tags.length === 0) {
    return "Please select at least one tag";
  }
  return "";
};

export const validatePost = (
  id: string,
  value: string,
  formData: CreatePost
): CreatePost => {
  let errors: CreatePost = { ...formData };
  if (id === "title") {
    errors.title = validateTitle(value);
  } else if (id === "description") {
    errors.description = validateDescription(value);
  } 
  return errors;
};
