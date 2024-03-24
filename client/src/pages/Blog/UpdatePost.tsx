import { useEffect, useState } from "react";
import FormInputs from "../../components/FormInputs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MediumButton } from "../../components/ButtonComponent";
import { useAppDispatch } from "../../store/hooks";
import { useSelector } from "react-redux";
import { selectTags } from "../../store/tags/tagsSlice";
import { retrieveAllTags } from "../../api/tagsThunk";
import { updatePost } from "../../api/postThunk";
import { Alert } from "@material-tailwind/react";
import { selectPost } from "../../store/posts/postSlice";
import { useValidateBlogForm } from "../../utils/validatePost";
import { useNavigate, useParams } from "react-router-dom";

interface Tag {
  id: number;
  name: string;
}

interface FormData {
  title: string;
  description: string;
  tags: string;
  file: string;
}

const UpdatePost = () => {
  const dispatch = useAppDispatch();
  const { tags, loading, retrieveError } = useSelector(selectTags);
  const { successful, updateError } = useSelector(selectPost);
  const { postId } = useParams();
  const { errors, validateForm, displayErrors } = useValidateBlogForm();
  const { post } = useSelector(selectPost);
  const navigate = useNavigate();

  const [data, setData] = useState({
    postId: postId ?? "",
    title: post.posts[0].title,
    description: post.posts[0].description,
    tags: [] as string[],
  });
  const [postSuccess, setPostSuccess] = useState(false);

  useEffect(() => {
    tags?.length === 0 && dispatch(retrieveAllTags());
  }, [dispatch]);

  useEffect(() => {
    if (successful) {
      setPostSuccess(true);
    }
  }, [successful]);

  const handlePostSuccessClose = () => {
    setPostSuccess(false);
  };

  const handleSubmit = () => {
      dispatch(updatePost(data));
    //   navigate(`../blog/${postId}`);
  };

  const handleTagChange = (tagId: string) => {
    const updatedTags = data.tags.includes(tagId)
      ? data.tags.filter((id) => id !== tagId)
      : [...data.tags, tagId];
    setData({ ...data, tags: updatedTags });
  };
console.log(data);
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setData({ ...data, title: value });
  };

  return (
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
                      id={`tag-${tag.id}`}
                      className="mr-2"
                      onChange={() => handleTagChange(String(tag.id))}
                    />
                    <label htmlFor={`tag-${tag.id}`}>{tag.name}</label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="w-2/3 flex flex-col">
            <FormInputs
              label="Title"
              id="title"
              type="text"
              placeholder="Title"
              name="file"
              value={data.title}
              errorMessage={errors.title}
              updateValue={(value) => setData({ ...data, title: value })}
              onChange={handleTitleChange}
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
              value={data.description}
              onChange={(value) => setData({ ...data, description: value })}
            />
            <span
              className={`text-red-600 text-sm ${
                errors.description ? "block" : "hidden"
              }`}
            >
              {errors.description}
            </span>
            {postSuccess && (
              <Alert
                onClose={handlePostSuccessClose}
                className="bg-green-200 py-2 px-6 text-green-500"
              >
                Post is published
              </Alert>
            )}
            {updateError && (
              <div className="mt-10">
                <Alert className="bg-red-200 py-2 px-6 text-red-600">
                  {updateError}
                </Alert>
              </div>
            )}

            <div className="mt-8">
              <MediumButton onClick={handleSubmit}>Save changes</MediumButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
