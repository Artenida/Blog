import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {ImagesCardProps} from "../../types/postTypes"

const DisplayImages: React.FC<ImagesCardProps> = ({ posts }) => {
  const [mainImage, setMainImage] = useState<string | undefined>(() => {
    const post = posts.find((post) => post.images.length > 0);
    return post ? post.images[0].url : undefined;
  });
  const initialMainImage =
    posts.length > 0 && posts[0].images.length > 0
      ? posts[0].images[0].url
      : undefined;

  const handleClick = (image: string) => {
    setMainImage(image);
  };

  useEffect(() => {
    setMainImage(initialMainImage);
  }, [posts]);

  return (
    <div className="flex justify-center flex-col gap-3 items-center">
      <div>
        {mainImage && (
          <img
            className="rounded-xl w-[900px] h-[600px]"
            src={`http://localhost:5000/${mainImage.replace(/\\/g, "/")}`}
            alt="Main Image"
          />
        )}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) =>
          post.images.map((image, index: number) => (
            <div key={index} className="mt-5">
              <Link to={`/blog/${post.post_id}`} key={index}>
                <img
                  src={`http://localhost:5000/${image.url.replace(/\\/g, "/")}`}
                  alt="blogPicture"
                  className="w-44 h-44 rounded-lg"
                  onClick={() => handleClick(image.url)}
                />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DisplayImages;
