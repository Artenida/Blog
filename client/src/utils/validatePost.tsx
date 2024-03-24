import { useState } from "react";

interface CreatePost {
  title: string;
  description: string;
  tags: string[];
  file: FileList | [];
}

type CreatePostError = {
  title: string;
  description: string;
  tags: string;
  files: string;
};

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

export const validateFiles = (files: FileList | []) => {
  if (files) {
    return files.length === 0 ? "Please upload at least one image" : "";
  }
  return "";
};

export const useValidateBlogForm = () => {
  const [errors, setErrors] = useState<CreatePostError>({
    title: '',
    description: '',
    tags: '',
    files: '',
  });

  const [hasError, setHasError] = useState(true);

  const validateForm = (inputs: CreatePost) => {
    const titleError = validateTitle(inputs.title);
    const descriptionError = validateDescription(inputs.description);
    const tagsError = validateTags(inputs.tags);
    const filesError = validateFiles(inputs.file);
    setHasError(!!(titleError || descriptionError || tagsError || filesError));
  }

  const displayErrors = (inputs: CreatePost) => {
    const titleError = validateTitle(inputs.title);
    const descriptionError = validateDescription(inputs.description);
    const tagsError = validateTags(inputs.tags);
    const filesError = validateFiles(inputs.file);
    setErrors({title: titleError, description: descriptionError, tags: tagsError, files: filesError})
  }

  return {
    errors,
    hasError,
    validateForm,
    displayErrors,
  }
};
