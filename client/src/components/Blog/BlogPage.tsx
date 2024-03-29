import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
// import Pagination from "../../components/pagination/PaginationButtons";
import { useAppDispatch } from "../../store/hooks";
import { retrieveAllPosts, retrievePaginatedPosts } from "../../api/postThunk";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { selectPost } from "../../store/posts/postSlice";

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
  data: {
    next?: { pageAsNumber: number };
    prev?: { pageAsNumber: number };
    result: Paginated[];
    totalUser?: number;
    pageCount?: number;
  };
}


const BlogPage = () => {
  const dispatch = useAppDispatch();
  const [currentBlogs, setCurrentBlogs] = useState<Paginated[]>([]);
  // const {currentPost} = useSelector(selectPost);
  const { paginatedPost, loading, retrieveError } = useSelector(selectPost);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    dispatch(retrievePaginatedPosts({page, limit}));
  }, [dispatch]);

  // useEffect(()=> {
  //   dispatch(retrieveAllPosts())
  // },[dispatch])

  useEffect(() => {
    if (paginatedPost?.data?.result) {
      setCurrentBlogs(paginatedPost?.data?.result);
    }
  }, [paginatedPost]);  
  
  console.log(paginatedPost?.data.result)

  const handlePageClick = () => {
    // console.log("e")
  }

  useEffect(() => {
    dispatch(retrievePaginatedPosts({ page, limit }));
  }, [dispatch, page, limit]);
  

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
          </>
        )}
        <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={8}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default BlogPage;