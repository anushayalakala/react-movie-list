import React, { Component } from "react";
import _ from "lodash";

class Pagination extends Component {
  render() {
    const {
      totalCount,
      pageSize,
      onPagination,
      currentPage,
      currentGenre
    } = this.props;
    const totalPages = Math.ceil(totalCount / pageSize);
    if (totalPages === 1) return null;
    const pages = _.range(1, totalPages + 1);
    return (
      <nav aria-label="Page navigation">
        <ul
          className={
            currentGenre === "All Genre"
              ? "pagination  pagination-sm"
              : "pagination  pagination-sm invisible"
          }
        >
          {pages.map(page => (
            <li
              key={page}
              class="page-item"
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a class="page-link" href="#" onClick={() => onPagination(page)}>
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Pagination;
