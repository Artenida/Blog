import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
// import Pagination from "../../components/pagination/PaginationButtons";
import { useAppDispatch } from "../../store/hooks";
import { filterPosts, retrieveAllPosts, retrievePaginatedPosts } from "../../api/postThunk";
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
  const {currentPost} = useSelector(selectPost);
  const { paginatedPost, loading, retrieveError } = useSelector(selectPost);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [pageCount, setPageCount] = useState(1);
  // const [keyword, setKeyword] = useState("New");

  useEffect(() => {
    dispatch(retrieveAllPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(retrievePaginatedPosts({page, limit}));
  }, [dispatch]);

  useEffect(() => {
    if (paginatedPost?.result) {
      setCurrentBlogs(paginatedPost.result);
    }
  }, [paginatedPost]);  

  console.log(paginatedPost)
  console.log(paginatedPost?.pageCount)

  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
  }
  
  useEffect(() => {
    dispatch(retrievePaginatedPosts({ page, limit }));
  }, [dispatch, page, limit]);

  // const {searchedPost, filterSearch} = useSelector(selectPost);
  // console.log(searchedPost);
  
  // useEffect(()=>{
  //   dispatch(filterPosts({keyword}));
  // },[dispatch, keyword])

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
        pageCount={8}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default BlogPage;