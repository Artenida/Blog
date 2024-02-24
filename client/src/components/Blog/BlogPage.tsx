import React, { useState } from "react";
import BlogCard from "./BlogCard";
import { new_blogs } from "../../constants/data";
import Sidebar from "../Sidebar";
import Pagination from "../../components/pagination/PaginationButtons";

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(0); // State to manage current page
  const itemsPerPage = 9; // Maximum number of cards per page

  // Function to handle page change
  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  // Calculate the start and end index of the blogs array based on the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = (currentPage + 1) * itemsPerPage;

  // Slice the blogs array to display only the cards for the current page
  const currentBlogs = new_blogs.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col">
      {/* <div className="mr-4"> 
      <Sidebar />
    </div> */}

      <div className="relative max-w-7xl mx-auto flex-1">
        <BlogCard blogs={currentBlogs} />
        <Pagination
          // totalItems={40}
          totalItems={new_blogs.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default BlogPage;
