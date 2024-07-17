import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="join w-full flex justify-center items-center mx-auto m-8">
      <button
        className="btn btn-primary mx-4"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="text-lg text-primary font-semibold mx-4"> 
        {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn btn-primary mx-4"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
