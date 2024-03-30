import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
// import Pagination from "../../components/pagination/PaginationButtons";
import { useAppDispatch } from "../../store/hooks";
import { retrievePaginatedPosts } from "../../api/postThunk";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { selectPost } from "../../store/posts/postSlice";
import Searchbar from "../Searchbar";

interface Tag {
  id: number;
  name: string;
}
interface Image {
  url: string;
}

interface Paginated {
  id: string;
  images: Image[]; 
  title: string;
  tags: Tag[];
  username: string;
  profile_picture: string | undefined;
  description: string;
  createdAt: Date;
}
interface PaginatedPosts {
    next?: { pageAsNumber: number };
    prev?: { pageAsNumber: number };
    result: Paginated[];
    totalUser?: number;
    pageCount?: number;
}

const BlogPage = () => {
  const dispatch = useAppDispatch();
  const [currentBlogs, setCurrentBlogs] = useState<Paginated[]>([]);
  const { paginatedPost, loading, retrieveError } = useSelector(selectPost);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(9);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    if (paginatedPost?.result) {
      setCurrentBlogs(paginatedPost.result);
    }
  }, [paginatedPost]);  

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  useEffect(() => {
    if (currentPage !== 0) {
      getPaginatedPosts();
    }
  }, [currentPage, dispatch]);
    
  const getPaginatedPosts = () => {
    dispatch(retrievePaginatedPosts({ currentPage, limit }));
    setPageCount(paginatedPost?.pageCount ?? 1);
  }

  return (
    <div className="flex flex-col">
      <Searchbar />
      <div className="relative max-w-7xl mx-auto flex-1">
        
        {loading ? (
          <div>Loading...</div>
        ) : retrieveError ? (
          <div>Error: {retrieveError}</div>
        ) : (
          <>
            <BlogCard posts={currentBlogs} />
          </>
        )}
        <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
        />
      </div>
    </div>
  );
};

export default BlogPage;