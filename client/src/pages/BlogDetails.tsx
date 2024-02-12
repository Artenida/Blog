import { Link } from "react-router-dom";
import BlogDetailsComponents from "../components/BlogDetailsComponent";
import images from "../constants/images";

const blogDetailsComponents = [
  { name: "Home", link: "/" },
  { name: "Blog", link: "/blog" },
  { name: "Article title", link: "/blog/1" },
];

const blogDetails = () => {
  return (
    <div>
      <div className="container mx-auto max-w-5xl flex flex-col px-5 py-5">
        <article className="flex-1">
          <BlogDetailsComponents data={blogDetailsComponents} />
          <img
            className="rounded-xl w-full"
            src={images.blog1}
            alt="first_blog"
          />
          <Link
            to="/blog?tags=selectedTags"
            className="text-primary text-sm font-roboto inline-block mt-4"
          >
            Places
          </Link>
          <h1 className="text-xl font-medium font-roboto mt-4 text-custom-color3">
            Places to photograph
          </h1>
          <div className="mt-4 text-custom-color3">
            <p className="">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Corrupti, at? Iusto sit libero delectus ea eligendi eos fugit
              impedit soluta dignissimos, facilis suscipit laboriosam voluptatem
              praesentium odio quisquam voluptate facere? Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Suscipit blanditiis est,
              numquam quidem, quia non exercitationem esse porro accusamus
              quisquam similique voluptate explicabo iusto beatae molestias hic.
              A temporibus qui laborum maxime laudantium, quaerat reiciendis
              debitis ab nostrum veritatis rem.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default blogDetails;
