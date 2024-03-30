import { useEffect, useRef, useState } from "react";
import BlogCard from "./BlogCard";
import { useAppDispatch } from "../../store/hooks";
import { filterPosts, retrievePaginatedPosts } from "../../api/postThunk";
import { useSelector } from "react-redux";
import { selectPost } from "../../store/posts/postSlice";
import Searchbar from "../Searchbar";
import PaginationButtons from "../../components/pagination/PaginationButtons";

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
  const { paginatedPost, loading, retrieveError } = useSelector(selectPost);
  const [currentBlogs, setCurrentBlogs] = useState<Paginated[]>([]);
  const currentPageRef = useRef<number>(1);
  const [limit, setLimit] = useState<number>(9);
  const [pageCount, setPageCount] = useState(1);
  const [keyword, setKeyword] = useState("New");
  const { searchedPost, filterSearch } = useSelector(selectPost);
  const [records, setRecords] = useState<Paginated[]>([]);

  useEffect(() => {
    dispatch(filterPosts({ keyword: keyword }));
  }, [dispatch, keyword]);

  useEffect(() => {
    getPaginatedPosts();
  }, [dispatch]);

  useEffect(() => {
    if (paginatedPost?.result) {
      setCurrentBlogs(paginatedPost.result);
      setRecords(paginatedPost.result);
    }
  }, [paginatedPost]);

  const handlePageClick = (selectedItem: { selected: number }) => {
    currentPageRef.current = selectedItem.selected + 1;
    getPaginatedPosts();
  };

  const getPaginatedPosts = () => {
    dispatch(
      retrievePaginatedPosts({ currentPage: currentPageRef.current, limit })
    );
    setPageCount(paginatedPost?.pageCount ?? 1);
  };

  const filter = (searchValue: string) => {
    setKeyword(searchValue);
    if (!currentBlogs) return;
  
    const filteredPosts = currentBlogs.filter(post =>
      post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      post.description.toLowerCase().includes(searchValue.toLowerCase()) ||
      post.username.toLowerCase().includes(searchValue.toLowerCase()) ||
      post.tags[0]?.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setRecords(filteredPosts);
  };

  return (
    <div className="flex flex-col">
      <Searchbar onChange={filter} />

      <div className="relative max-w-7xl mx-auto flex-1">
        {loading ? (
          <div>Loading...</div>
        ) : retrieveError ? (
          <div>Error: {retrieveError}</div>
        ) : (
          <>
            <BlogCard posts={records} />
          </>
        )}

        <PaginationButtons
          pageCount={pageCount}
          onPageChange={handlePageClick}
        />
      </div>
    </div>
  );
};

export default BlogPage;
