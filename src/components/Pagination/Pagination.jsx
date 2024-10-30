import React from "react";
import { useState, useEffect } from "react";
import { useHref, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { tdxParameters } from "@/api/tdx/tdxTourism_api";
const Pagination = ({ paginationDetails, paginationStyle = "basic" }) => {
  const navigate = useNavigate();
  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
  };
  const { total_pages, current_page, has_pre, has_next, category } =
    paginationDetails || {};

  //****************
  // tdxPagination
  //****************
  const [pageCount, setPageCount] = useState(
    tdxParameters().tdxFilterCreator().$top
  ); // 預設值

  const handlePageCountChange = (event) => {
    const value = Number(event.target.value);
    if (value > 0) {
      setPageCount(value);
    }
  };
  const handlePageCountSearch = (event) => {
    const pageCount = event.target.value;
    if (!pageCount) return;
    navigate(`?$top=${pageCount}&category=${category}`);
  };
  return (
    <nav>
      {paginationStyle == "basic" ? (
        <ul className="pagination">
          <li className={`page-item ${!has_pre ? "disabled" : ""}`}>
            <a
              className="page-link"
              onClick={() => handlePageChange(current_page - 1)}
            >
              上一頁
            </a>
          </li>

          {[...Array(total_pages)].map((_, index) => {
            const page = index + 1;
            return (
              <li
                className={`page-item ${page === current_page ? "active" : ""}`}
                key={page}
              >
                <a className="page-link" onClick={() => handlePageChange(page)}>
                  {page}
                </a>
              </li>
            );
          })}

          <li className={`page-item ${!has_next ? "disabled" : ""}`}>
            <a
              className="page-link"
              onClick={() => handlePageChange(current_page + 1)}
            >
              下一頁
            </a>
          </li>
        </ul>
      ) : (
        <></>
      )}

      {paginationStyle === "tdxCount" ? (
        <div
          className="form-group d-flex text-nowrap"
          id="itemsPageCountSelect"
        >
          <label htmlFor="pageCount" className="p-1">
            查詢筆數
          </label>
          <input
            type="number"
            className="form-control"
            id="pageCount"
            value={pageCount}
            min="1"
            onChange={handlePageCountChange}
            onBlur={handlePageCountSearch}
          />
          <button
            className="btn-custom-primary"
            onClick={handlePageCountSearch}
          >
            確認
          </button>
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
};

export default Pagination;
