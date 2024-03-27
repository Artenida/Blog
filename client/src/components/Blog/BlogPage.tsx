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
interface BlogPost {
  id: string;
  cover: string | undefined;
  title: string;
  tags: Tag[];
  username: string;
  profilePicture: string | undefined;
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
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;
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

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = (currentPage + 1) * itemsPerPage;

  const slicedBlogs = currentBlogs.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col">
      <div className="relative max-w-7xl mx-auto flex-1">
        {loading ? (
          <div>Loading...</div>
        ) : retrieveError ? (
          <div>Error: {retrieveError}</div>
        ) : (
          <>
            <BlogCard posts={slicedBlogs} />
            <Pagination
              totalItems={currentBlogs.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPage;