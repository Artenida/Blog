import { spawn } from "child_process";
import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";

interface PaginationButtonsProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 0; i < pageCount; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  const handleClick = (pageNumber: any) => {
    onPageChange(pageNumber);
  };

  return (
    <ReactPaginate
      breakLabel={<span className="mr-4">...</span>}
      nextLabel={
        <span className="w-10 h-10 flex items-center justify-center bg-custom-color2 rounded-md">
          <FaAngleRight className="text-custom-color3" />
        </span>
      }
      pageCount={pageCount}
      pageRangeDisplayed={1}
      marginPagesDisplayed={2}
      previousLabel={
        <span className="w-10 h-10 flex items-center justify-center bg-custom-color2 rounded-md mr-4">
          <FaAngleLeft className="text-custom-color3" />
        </span>
      }
      onPageChange={({ selected }) => onPageChange(selected)}
      containerClassName="flex items-center justify-center mt-12"
      pageClassName={
        "inline-flex items-center justify-center border border-solid border-custom-color2 hover:bg-custom-color2 w-10 h-10 rounded-md mr-4 cursor-pointer"
      }
      activeClassName="bg-custom-color3 text-custom-color1"
    />
  );
};

export default PaginationButtons;
