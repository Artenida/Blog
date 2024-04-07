import { useEffect, useState } from "react";
import FormInputs from "../../components/FormInputs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MediumButton } from "../../components/ButtonComponent";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useSelector } from "react-redux";
import { selectTags } from "../../store/tags/tagsSlice";
import { retrieveAllTags } from "../../api/tagsThunk";
import { createPost } from "../../api/postThunk";
import { selectUser } from "../../store/user/userSlice";
import { Alert } from "@material-tailwind/react";
import { selectPost } from "../../store/posts/postSlice";
import { useValidateBlogForm } from "../../utils/validatePost";
import Sidebar from "../../components/Sidebar";

interface Tag {
  id: number;
  name: string;
}

type CreatePost = {
  title: string;
  description: string;
  tags: string[];
  files: FileList | [];
};

const CreatePost = () => {
  const dispatch = useAppDispatch();
  const { tags, loading, retrieveError } = useAppSelector(selectTags);
  const { createError } = useAppSelector(selectPost);
  const { currentUser } = useAppSelector(selectUser);
  const userId = currentUser?.user?.id;
  const { errors, hasError, validateForm, displayErrors } = useValidateBlogForm();
  const [success, setSuccess] = useState(false);

  const [data, setData] = useState<CreatePost>({
    title: "",
    description: "",
    tags: [] as string[],
    files: [],
  });

  useEffect(() => {
    tags?.length === 0 && dispatch(retrieveAllTags());
  }, [dispatch]);

  const handleSubmit = () => {
    validateForm({
      title: data.title,
      description: data.description,
      tags: data.tags,
      file: data.files,
    });
    displayErrors({
      title: data.title,
      description: data.description,
      tags: data.tags,
      file: data.files,
    });
  };

  useEffect(() => {
    if (!hasError) {
      const cleanedDescription = data.description.replace(/<[^>]+>/g, "");

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", cleanedDescription);
      formData.append("user_id", userId || "");
      for (let tag of data.tags) {
        formData.append("tags", tag);
      }
      for (let i = 0; i < data.files.length; i++) {
        formData.append("file", data.files[i]);
      }
      dispatch(createPost(formData)).then(() => setSuccess(true));
    }
  }, [hasError]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setData({ ...data, files: files });
    }
  };

  const handleTagChange = (tagId: string) => {
    const updatedTags = data.tags.includes(tagId)
      ? data.tags.filter((id) => id !== tagId)
      : [...data.tags, tagId];
    setData({ ...data, tags: updatedTags });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setData({ ...data, title: value });
  };

  return (
    <div className="flex flex-col md:flex-row -z-50">
      <Sidebar />
      <div className="border-r-4 border-opacity-50 my-12 ml-4 border-custom-color2 h-[900px]"></div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          <div
            className="flex justify-between items-start gap-8"
            onSubmit={handleSubmit}
          >
            <div className="w-1/3">
              <h3 className="mb-4 text-lg font-semibold">Select Tags:</h3>
              {loading ? (
                <p>Loading...</p>
              ) : retrieveError ? (
                <p>Error: {retrieveError}</p>
              ) : (
                <ul>
                  {tags?.map((tag: Tag) => (
                    <li key={tag.id} className="mb-2">
                      <input
                        type="checkbox"
                        id={`${tag.id}`}
                        className="mr-2"
                        onChange={() => handleTagChange(String(tag.id))}
                      />
                      <label htmlFor={`tag-${tag.id}`}>{tag.name}</label>
                    </li>
                  ))}
                </ul>
              )}
              <span
                className={`text-sm text-red-600 pl-1 pt-1${
                  errors.tags ? "block" : "hidden"
                } h-4`}
              >
                {errors.tags}
              </span>
            </div>

            <div className="w-2/3 flex flex-col">
              <input
                type="file"
                id="file"
                name="file"
                multiple
                required
                onChange={handleFileChange}
              />
              <span
                className={`text-sm text-red-600 pl-1 pt-1 ${
                  errors.files ? "block" : "hidden"
                } h-4`}
              >
                {errors.files}
              </span>
              <FormInputs
                label="Title"
                id="title"
                type="text"
                placeholder="Title"
                name="file"
                errorMessage={errors.title}
                updateValue={(value) => setData({ ...data, title: value })}
                onChange={handleTitleChange}
              />
              <label
                htmlFor="description"
                className="block mb-2 mt-12 pl-1 font-semibold"
              >
                Description
              </label>
              <ReactQuill
                theme="snow"
                style={{ height: "300px" }}
                className="mb-4"
                onChange={(value) => setData({ ...data, description: value })}
              />
              <span
                className={`text-sm text-red-600 pl-1 pt-8 ${
                  errors.description ? "block" : "hidden"
                } h-4`}
              >
                {errors.description}
              </span>

              {success && (
                <Alert className="bg-green-200 py-2 px-6 text-green-500 mt-12">
                  Post is published
                </Alert>
              )}

              {createError && (
                <Alert className="bg-red-200 py-2 px-6 text-red-500 mt-12">
                  {createError}
                </Alert>
              )}
              <div className="mt-8">
                <MediumButton onClick={handleSubmit}>Publish</MediumButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
