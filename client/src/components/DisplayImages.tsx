import React, { useState } from "react";
import { Link } from "react-router-dom";

interface PostDetails {
  user_id: string;
  username: string;
  profile_picture: string;
  post_id: string;
  title: string;
  description: string;
  createdAt: Date;
  images: Image[];
  tags: Tag[];
  tag_Id: string;
}

interface Tag {
  id: number;
  name: string;
}

interface Image {
  url: string;
}

interface BlogCardProps {
  posts: PostDetails[];
}

const DisplayImages: React.FC<BlogCardProps> = ({ posts }) => {
  const initialMainImage =
    posts.length > 0 && posts[0].images.length > 0
      ? posts[0].images[0].url
      : undefined;
  const [mainImage, setMainImage] = useState<string | undefined>(
    initialMainImage
  );

  const handleClick = (image: string) => {
    setMainImage(image);
  };

  return (
    <div className="flex justify-center gap-3">
      <div className="flex gap-4">
        {posts.map((post) => (
          <div key={post.post_id}>
            {post.images &&
              post.images.length > 0 &&
              post.images.map((image, index: number) => (
                <div key={index} className="mt-5">
                  <Link to={`/blog/${post.post_id}`} key={index}>
                    <img
                      src={`http://localhost:5000/${image.url.replace(
                        /\\/g,
                        "/"
                      )}`}
                      alt="blogPicture"
                      className="w-full h-64 rounded-lg"
                      onClick={() => handleClick(image.url)}
                    />
                  </Link>
                  </div>
              ))}
          </div>
        ))}
      </div>

      <div>
        {mainImage && (
          <img
            className="rounded-xl w-[800px] h-[600px]"
            src={`http://localhost:5000/${mainImage.replace(/\\/g, "/")}`}
            alt="Main Image"
          />
        )}
      </div>
    </div>
  );
};

export default DisplayImages;
