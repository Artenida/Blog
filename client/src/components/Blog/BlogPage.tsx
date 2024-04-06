import { useEffect, useRef, useState } from "react";
import BlogCard from "./BlogCard";
import { useAppDispatch } from "../../store/hooks";
import {
  filterPosts,
  retrieveAllPosts,
  retrievePaginatedPosts,
} from "../../api/postThunk";
import { useSelector } from "react-redux";
import { selectPost } from "../../store/posts/postSlice";
import Searchbar from "../Searchbar";
import PaginationButtons from "../PaginationButtons";
import Loading from "./Loading";

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

const BlogPage = () => {
  const dispatch = useAppDispatch();
  const { paginatedPost, loading, retrieveError } = useSelector(selectPost);
  const { currentPost } = useSelector(selectPost);
  const [currentBlogs, setCurrentBlogs] = useState<Paginated[]>([]);
  const [allPosts, setAllPosts] = useState<Paginated[]>([]);
  const currentPageRef = useRef<number>(1);
  const [limit, setLimit] = useState<number>(9);
  const [pageCount, setPageCount] = useState(1);
  const [keyword, setKeyword] = useState("New");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    dispatch(filterPosts({ keyword: keyword }));
  }, [dispatch, keyword]);

  useEffect(() => {
    getPaginatedPosts();
  }, [dispatch]);

  useEffect(() => {
    if (paginatedPost?.result) {
      setCurrentBlogs(paginatedPost.result);
    }
  }, [paginatedPost]);

  useEffect(() => {
    dispatch(retrieveAllPosts());
  }, [dispatch]);

  useEffect(() => {
    if (currentPost) {
      setAllPosts(currentPost);
    }
  }, [currentPost]);

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
    setSearching(searchValue.trim().length > 0);

    if (!allPosts) return;

    const filteredPosts = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        post.description.toLowerCase().includes(searchValue.toLowerCase()) ||
        post.username.toLowerCase().includes(searchValue.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.name.toLowerCase().includes(searchValue.toLowerCase())
        )
    );
    setCurrentBlogs(filteredPosts);
  };

  return (
    <div className="flex flex-col">
      <Searchbar onChange={filter} />

      <div className="relative max-w-7xl mx-auto flex-1">
        {loading ? (
          <div>
            <Loading />
          </div>
        ) : retrieveError ? (
          <div>Error: {retrieveError}</div>
        ) : (
          <div className="mx-8">
            <BlogCard posts={currentBlogs} />
          </div>
        )}

        {!searching && (
          <PaginationButtons
            pageCount={pageCount}
            onPageChange={handlePageClick}
          />
        )}
      </div>
    </div>
  );
};

export default BlogPage;
