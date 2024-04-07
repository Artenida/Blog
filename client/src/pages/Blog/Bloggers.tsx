import { useEffect } from "react";
import { selectPost } from "../../store/posts/postSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { retrieveAllAuthors } from "../../api/postThunk";
import BloggersCard from "../../components/Blog/BloggersCard";

const Bloggers = () => {
  const dispatch = useAppDispatch();
  const { currentAuthor } = useAppSelector(selectPost);

  useEffect(() => {
    dispatch(retrieveAllAuthors());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 sm:px-2 lg:px-4 gap-6 mt-12">
      <BloggersCard authors={currentAuthor}/>
    </div>
  );
};

export default Bloggers;
