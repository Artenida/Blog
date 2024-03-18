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
import { Alert, input } from "@material-tailwind/react";
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

  interface FormData {
    title: string;
    description: string;
    tags: string;
    file: string;
  }

  const [formDataErrors, setFormDataErrors] = useState<FormData>({
    title: "",
    description: "",
    tags: "",
    file: "",
  });
  const [postSuccess, setPostSuccess] = useState(false);
  const hasErrors = Object.values(formDataErrors).some((error) => error !== "");

  useEffect(() => {
    if (!hasErrors) {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("user_id", userId);
      for (let element of data.tags) {
        formData.append("tags", element);
      }
      for (let i = 0; i < data.files.length; i++) {
        formData.append("files", data.files[i]);
      }
      dispatch(createBlog(formData));
    }
  }, [hasErrors]);


const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
  setData({ ...data, files: event.target.files ?? [] })
}
const handleInputChange = (value: string) => {
  setData({...data, title: value})
}
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
                      value={tag.name}
                      className="mr-2"
                      onChange={(event) => {
                        const isChecked = event.target.checked;
                        const tagName = event.target.value;

                        const updatedTags = isChecked
                          ? [...data.tags, tagName]
                          : data.tags.filter((tag) => tag !== tagName);

                        setData({ ...data, tags: updatedTags });
                      }}
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
              onChange={handleFiles}
            />

            <FormInputs
              label="Title"
              id="title"
              type="text"
              placeholder="Title"
              // value={data.title}
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
              style={{ height: "300px" }}
              className="mb-4"
              onChange={(value) => setData({ ...data, description: value })}
            />
            <h2> {formDataErrors.description}</h2>

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
              <MediumButton>Publish</MediumButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
