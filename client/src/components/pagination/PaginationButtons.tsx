import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import motion from 'framer-motion'


const MyComponent = () => {
    const [currentPage, setCurrentPage] = useState(0); // State to manage current page

    // Mock data for demonstration
    const data = Array.from({ length: 100 }).map((_, index) => `Item ${index + 1}`);

    // Constants for pagination
    const itemsPerPage = 10;
    const pageCount = Math.ceil(data.length / itemsPerPage);

    // Function to handle page change
    const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    };

    // Function to slice data based on current page
    const currentData = data.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
      <div>
      <ul>
          {currentData.map((item, index) => (
              <li key={index}>{item}</li>
          ))}
      </ul>

            <ReactPaginate
                breakLabel={
                  <span className='mr-4'>...</span>
                }
                nextLabel={
                  <span className='w-10 h-10 flex items-center justify-center bg-custom-color2 rounded-md'>
                    <FaAngleRight className='text-custom-color3'/>
                  </span>
                }
                pageRangeDisplayed={3}
                pageCount={10}
                previousLabel = {
                  <span className='w-10 h-10 flex items-center justify-center bg-custom-color2 rounded-md mr-4'>
                    <FaAngleLeft className='text-custom-color3'/>
                  </span>
                }
                // marginPagesDisplayed={2}
                onPageChange={handlePageChange}
                containerClassName='flex items-center justify-center mt-12'
                pageClassName={'block border- border-solid border-custom-color2 hover:bg-custom-color2 w-10 h-10 flex items-center justify-center rounded-md mr-4'}
                activeClassName='bg-custom-color3 text-custom-color1'
            />
        </div>
    );
};

export default MyComponent;
