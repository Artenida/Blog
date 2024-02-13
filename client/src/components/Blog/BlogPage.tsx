import React, { useState } from "react";
import BlogCard from "./BlogCard";
import { new_blogs } from "../../config/data";

const BlogPage = () => {
  // const [blogs, setBlogs] = useState(data);
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <BlogCard blogs={new_blogs} />
      </div>
    </div>
  );
};

export default BlogPage;
