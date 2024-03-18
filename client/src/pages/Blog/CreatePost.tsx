import { useCallback, useEffect, useState } from "react";
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
import { validatePost } from "../../utils/validatePost";

interface Tag {
  tagId: number;
  name: string;
}

type CreatePost = {
  title: string;
  description: string;
  user_id: string;
  tags: string[];
  files: FileList | [];
};
interface FormData {
  title: string;
  description: string;
  tags: string;
  file: string;
}

const CreatePost = () => {
  const dispatch = useAppDispatch();
  const { tags, loading, retrieveError } = useSelector(selectTags);
  const { currentUser } = useSelector(selectUser);
  const userId = currentUser?.user?.id;

  const [data, setData] = useState<CreatePost>({
    title: "",
    description: "",
    tags: [] as string[],
    user_id: userId ?? "",
    files: [],
  });

  const [formDataErrors, setFormDataErrors] = useState<FormData>({
    title: "",
    description: "",
    tags: "",
    file: "",
  });
  const [postSuccess, setPostSuccess] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const updatedErrors = validatePost(id, value, formDataErrors);
    setData({ ...data, [id]: value.trim() });
    setFormDataErrors(updatedErrors);
  };

  const handleTagChange = (tag: string) => {
    const updatedTags = data.tags.includes(tag)
      ? data.tags.filter((t) => t !== tag)
      : [...data.tags, tag];
    setData({ ...data, tags: updatedTags });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setData({ ...data, files: files });
    }
  };
console.log(data);
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("user_id", userId);
    for (let tag of data.tags) {
      formData.append("tags", tag);
    }
    for (let i = 0; i < data.files.length; i++) {
      formData.append("files", data.files[i]);
    }
    dispatch(createBlog(formData));
  };

  useEffect(() => {
    dispatch(retrieveAllTags());
  }, [dispatch]);

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
                  <li key={tag.tagId} className="mb-2">
                    <input
                      type="checkbox"
                      id={`tag-${tag.tagId}`}
                      className="mr-2"
                      onChange={() => handleTagChange(tag.name)}
                    />
                    <label htmlFor={`tag-${tag.tagId}`}>{tag.name}</label>
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
              onChange={handleFileChange}
            />

            <FormInputs
              label="Title"
              id="title"
              type="text"
              placeholder="Title"
              errorMessage={formDataErrors.title}
              onChange={handleChange}
            />

            <label
              htmlFor="description"
              className="block mb-2 mt-8 pl-1 font-semibold"
            >
              Description
            </label>
            <ReactQuill
              theme="snow"
              style={{ height: "300px" }}
              className="mb-4"
              onChange={(value) => setData({ ...data, description: value })}
            />

            {postSuccess && (
              <Alert className="bg-green-200 py-2 px-6 text-green-500">
                Post is published
              </Alert>
            )}

            {formDataErrors.tags && (
              <Alert className="bg-green-200 py-2 px-6 text-red-500">
                You have to select at least one tag
              </Alert>
            )}

            <div className="mt-8">
              <MediumButton onClick={handleSubmit}>Publish</MediumButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
