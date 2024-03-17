import { useEffect, useState } from "react";
import FormInputs from "../../components/FormInputs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MediumButton } from "../../components/ButtonComponent";
import { useAppDispatch } from "../../store/hooks";
import { useSelector } from "react-redux";
import { selectTags } from "../../store/tags/tagsSlice";
import { retrieveAllTags } from "../../api/tagsThunk";

interface Tag {
  tagId: number;
  name: string;
}

interface CreatePostType {
  title: string;
  description: string;
  tags: string[];
  userId: string;
  images: FileList | [];
}

const CreatePost = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const { tags, loading, retrieveError } = useSelector(selectTags);

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
                  <li key={tag?.tagId} className="mb-2">
                    <input
                      type="checkbox"
                      id={`tag-${tag?.tagId}`}
                      value={tag?.name}
                      className="mr-2"
                    />
                    <label htmlFor={`tag-${tag?.tagId}`}>{tag?.name}</label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="w-2/3 flex flex-col">
            <FormInputs label="Upload Image" type="file" id="file" />
            <FormInputs
              label="Title"
              id="title"
              type="text"
              placeholder="Title"
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
            <div className="mt-8">
              <MediumButton>Create</MediumButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
