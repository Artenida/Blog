import { useState } from "react";

interface UpdatePost {
    title: string;
    description: string;
    tags: string[];
  }
  
  type CreatePostError = {
    title: string;
    description: string;
    tags: string;
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
  
  export const useValidateUpdate = () => {
    const [errors, setErrors] = useState<CreatePostError>({
      title: '',
      description: '',
      tags: '',
    });
  
    const [hasError, setHasError] = useState(true);
  
    const validateForm = (inputs: UpdatePost) => {
      const titleError = validateTitle(inputs.title);
      const descriptionError = validateDescription(inputs.description);
      const tagsError = validateTags(inputs.tags);
      setHasError(!!(titleError || descriptionError || tagsError));
    }
  
    const displayErrors = (inputs: UpdatePost) => {
      const titleError = validateTitle(inputs.title);
      const descriptionError = validateDescription(inputs.description);
      const tagsError = validateTags(inputs.tags);
      setErrors({title: titleError, description: descriptionError, tags: tagsError})
    }
  
    return {
      errors,
      hasError,
      validateForm,
      displayErrors,
    }
  };
  