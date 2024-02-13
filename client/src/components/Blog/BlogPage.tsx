import React, { useState, useEffect } from "react";
// import axios from 'axios';
import BlogCard from "./BlogCard";
// import { data } from "../../config/data";
import blog1 from "../../assets/posts/blog1.avif";
import blog2 from "../../assets/posts/blog2.jpg";
import blog3 from "../../assets/posts/blog3.avif";
import profile from "../../assets/posts/profile.webp";
import profile1 from "../../assets/posts/profile2.jpg";

const tags = [
  {
    id: 1,
    name: "tag1",
  },
  {
    id: 2,
    name: "tag",
  },
  {
    id: 3,
    name: "othertag",
  },
];
const blogs = [
  {
    id: 1,
    cover: blog1,
    title: "Title",
    tags: tags,
    authorName: "User",
    profilePicture: profile,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dapibus eu lectus id gravida...",
    createdAt: new Date(),
  },
  {
    id: 1,
    cover: blog2,
    title: "Title",
    tags: tags,
    authorName: "User",
    profilePicture: profile1,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dapibus eu lectus id gravida...",
    createdAt: new Date(),
  },
  {
    id: 1,
    cover: blog3,
    title: "Title",
    tags: tags,
    authorName: "User",
    profilePicture: profile,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dapibus eu lectus id gravida...",
    createdAt: new Date(),
  },
];

const BlogPage = () => {
  // const [blogs, setBlogs] = useState(data);
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <BlogCard blogs={blogs} />
      </div>
    </div>
  );
};

export default BlogPage;
