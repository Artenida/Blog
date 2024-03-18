import { useEffect, useState } from "react";
import FormInputs from "../../components/FormInputs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MediumButton } from "../../components/ButtonComponent";
import { useAppDispatch } from "../../store/hooks";
import { useSelector } from "react-redux";
import { selectTags } from "../../store/tags/tagsSlice";
import { retrieveAllTags } from "../../api/tagsThunk";
import { createBlog } from "../../api/postThunk";
import { selectUser } from "../../store/user/userSlice";
import { Alert } from "@material-tailwind/react";

interface Tag {
  tagId: number;
  name: string;
}

interface FormData {
  title: string;
  description: string;
  tags: string;
  file: string;
}

const CreatePost = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { tags, loading, retrieveError } = useSelector(selectTags);
  const { currentUser } = useSelector(selectUser);
  const userId = currentUser?.user?.id;

  const [formDataErrors, setFormDataErrors] = useState<FormData>({
    title: "",
    description: "",
    tags: "",
    file: "",
  });

  useEffect(() => {
    dispatch(retrieveAllTags());
  }, [dispatch]);

  const handleSubmit = () => {
    const errors: FormData = { title: "", description: "", tags: "", file: "" };

    if (!title.trim()) {
      errors.title = "Title is required";
    }

    if (!value.trim()) {
      errors.description = "Description is required";
    }

    if (selectedTags.length === 0) {
      errors.tags = "Please select at least one tag";
    }

    if (Object.values(errors).some((error) => error !== "")) {
      setFormDataErrors(errors);
      return;
    }

    if (!file) {
      errors.file = "Please upload an image";
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", value);
    formData.append("tags", JSON.stringify(selectedTags));
    formData.append("userId", userId);
    formData.append("images", file);

    dispatch(createBlog({ formData: formData }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-start gap-8">
          <div className="w-1/3">
            <h3 className="mb-4 text-lg font-semibold">Select Tags:</h3>
            {loading ? (
              <p>Loading...</p>
            ) : retrieveError ? (
              <p>Error: {retrieveError}</p>
            ) : (
              <ul>
                {tags?.map((tag: Tag) => (
                  <li key={tag?.tagId} className="mb-2">
                    <input
                      type="checkbox"
                      id={`tag-${tag?.tagId}`}
                      value={tag?.name}
                      className="mr-2"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTags([...selectedTags, tag.name]);
                        } else {
                          setSelectedTags(
                            selectedTags.filter((t) => t !== tag.name)
                          );
                        }
                      }}
                    />
                    <label htmlFor={`tag-${tag?.tagId}`}>{tag?.name}</label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="w-2/3 flex flex-col">
            <FormInputs
              label="Upload Image"
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <FormInputs
              label="Title"
              id="title"
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              errorMessage={formDataErrors.title}
            />
            <label
              htmlFor="description"
              className="block mb-2 mt-8 pl-1 font-semibold"
            >
              Description
            </label>
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              style={{ height: "300px" }}
              className="mb-4"
            />
            {formDataErrors.description}

            {formDataErrors.tags && (
              <Alert className="bg-red-200 py-2 px-6 text-red-500">
                {formDataErrors.tags}
              </Alert>
            )}
            <div className="mt-8">
              <MediumButton onClick={handleSubmit}>Create</MediumButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
