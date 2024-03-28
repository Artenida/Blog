import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import Pagination from "../../components/pagination/PaginationButtons";
import { useAppDispatch } from "../../store/hooks";
import { retrieveAllPosts } from "../../api/postThunk";
import { useSelector } from "react-redux";

interface Tag {
  id: number;
  name: string;
}
interface Image {
  url: string;
}

interface BlogPost {
  id: string;
  images: Image[]; 
  title: string;
  tags: Tag[];
  username: string;
  profile_picture: string | undefined;
  description: string;
  createdAt: Date;
}

interface PostState {
  currentPost: [];
  loading: boolean;
  retrieveError: string | null;
}

const BlogPage = () => {
  const dispatch = useAppDispatch();
  const [currentBlogs, setCurrentBlogs] = useState<BlogPost[]>([]);
  const { currentPost, loading, retrieveError } = useSelector(
    (state: { post: PostState }) => state.post
  );
  console.log(currentPost)

  useEffect(() => {
    dispatch(retrieveAllPosts());
  }, [dispatch]);

  useEffect(() => {
    if (currentPost) {
      setCurrentBlogs(currentPost);
    }
  }, [currentPost]);



  return (
    <div className="flex flex-col">
      <div className="relative max-w-7xl mx-auto flex-1">
        {loading ? (
          <div>Loading...</div>
        ) : retrieveError ? (
          <div>Error: {retrieveError}</div>
        ) : (
          <>
            <BlogCard posts={currentBlogs} />
            {/* <Pagination
              currentPage={currentPage} setCurrentPage={}
            /> */}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPage;