import React, { useState } from "react";
import BlogCard from "./BlogCard";
import { new_blogs } from "../../config/data";
import Sidebar from "../Sidebar";

const BlogPage = () => {
  // const [blogs, setBlogs] = useState(data);
  return (
    <div className="flex">
      {/* <div className="mr-4"> 
        <Sidebar />
      </div> */}
      <div className="max-w-7xl mx-auto flex-1">
        <BlogCard blogs={new_blogs} />
      </div>
    </div>
  );
};

export default BlogPage;
