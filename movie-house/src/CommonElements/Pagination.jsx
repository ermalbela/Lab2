import React from 'react';
import { Pagination } from 'react-bootstrap';

const CustomPagination = ({ totalMovies, moviesPerPage, setTheCurrentPage, currentPage }) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pages.push(i);
  }

  return (
    <Pagination className='custom-pagination'>
      <Pagination.Prev
        onClick={() => setTheCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {pages.map((page, idx) => (
        <Pagination.Item
          key={idx}
          active={page === currentPage}
          onClick={() => setTheCurrentPage(page)}
        >
          {page}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => setTheCurrentPage(currentPage + 1)}
        disabled={currentPage === Math.ceil(totalMovies / moviesPerPage)}
      />
    </Pagination>
  );
};

export default CustomPagination;
