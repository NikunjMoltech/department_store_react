import React, { useEffect, useState } from "react";

const Pagination = ({ data, setPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 2;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(numberOfPages + 1).keys()].slice(1);

  function NextPage() {
    if (currentPage !== NextPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  function PrevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function ChangePage(number) {
    setCurrentPage(number);
  }
  return (
    <div>
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a href="#" className="page-link" onClick={() => PrevPage}>
              Prev
            </a>
          </li>
          {numbers.map((number, index) => {
            <li
              className={`page-item ${currentPage === number ? "active" : ""}`}
              key={index}
            >
              <a
                href="#"
                className="page-link"
                onClick={() => ChangePage(number)}
              >
                {number}
              </a>
            </li>;
          })}
          <li className="page-item">
            <a href="#" className="page-link" onClick={() => NextPage()}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
