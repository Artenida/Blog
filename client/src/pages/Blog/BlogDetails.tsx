import { useState } from "react";
import BlogPathComponent from "../../components/Blog/BlogPathComponent";
// import axios from "axios"; // Import Axios for making HTTP requests

interface Blog {
  id: number;
  title: string;
  image: string;
  description: string;
}
interface BlogDetailsItem {
  id: number;
  name: string;
  link: string;
}

const BlogPathComponents: BlogDetailsItem[] = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Blog", link: "/blog" },
];

const BlogDetails = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  return (
    <div>
      <div className="container mx-auto max-w-5xl flex flex-col px-5 py-5">
        <article className="flex-1">
          <BlogPathComponent data={BlogPathComponents} />
          {blog && (
            <div key={blog.id}>
              <img
                className="rounded-xl w-full"
                src={blog.image}
                alt={blog.title}
              />
              <h1 className="text-xl font-medium font-roboto mt-4 text-custom-color3">
                {blog.title}
              </h1>
              <div className="mt-4 text-custom-color3">
                <p className="">{blog.description}</p>
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default BlogDetails;
