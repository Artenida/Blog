import Banner from "../../components/Banner";
import BlogPage from "../../components/Blog/BlogPage";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";

const Blog = () => {
  const [blogs, setBlogs] = useState();

  return (
    <div>
      <Banner />
      <BlogPage />
    </div>
  );
};

export default Blog;
