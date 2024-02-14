import React from "react";
import { useParams } from "react-router-dom";
import BlogPathComponent from "../../components/Blog/BlogPathComponent";
import CommentsContainer from "../../components/Blog/CommentsForm";
interface Tag {
  id: number;
  name: string;
}

interface BlogType {
  id: number;
  cover: string;
  title: string;
  tags: Tag[];
  authorName: string;
  profilePicture: string;
  description: string;
  createdAt: Date;
}

const BlogPathComponents = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Blog", link: "/blog" },
];

const BlogDetails = ({ blogs }: { blogs: BlogType[] }) => {
  const { id } = useParams<{ id: string }>();

  // Find the blog with the matching id
  const blog = blogs.find((blog) => blog.id.toString() === id);

  if (!blog) {
    return <div>Loading...</div>; // Show a loading message while the blog is being fetched
  }

  return (
    <div>
      <div className="container mx-auto max-w-5xl flex flex-col px-5 py-5">
        <article className="flex-1">
          <BlogPathComponent data={BlogPathComponents} />
          <div>
            <img
              className="rounded-xl w-full"
              src={blog.cover}
              alt={blog.title}
            />
            <h1 className="text-xl font-medium font-roboto mt-4 text-custom-color3">
              {blog.title}
            </h1>
            <div className="mt-4 text-custom-color3">
              <p className="">{blog.description}</p>
            </div>
            <CommentsContainer />
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetails;
