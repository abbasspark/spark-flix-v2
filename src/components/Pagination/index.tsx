import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from: number, to: number, step = 1): number[] => {
  let i = from;
  const rangeArr: number[] = [];

  while (i <= to) {
    rangeArr.push(i);
    i += step;
  }

  return rangeArr;
};

interface PaginationProps {
  totalRecords: number;
  totalPages: number;
  pageLimit?: number;
  pageNeighbours?: number;
  onPageChanged?: (paginationData: {
    currentPage: number;
    totalPages: number;
    pageLimit: number;
    totalRecords: number;
  }) => any;
}

interface PaginationState {
  currentPage: number;
}

class Pagination extends Component<PaginationProps, PaginationState> {
  pageLimit: number;
  totalRecords: number;
  totalPages: number;
  pageNeighbours: number;
  static propTypes: { totalRecords: PropTypes.Validator<number>; pageLimit: PropTypes.Requireable<number>; pageNeighbours: PropTypes.Requireable<number>; onPageChanged: PropTypes.Requireable<(...args: any[]) => any>; };

  constructor(props: PaginationProps) {
    super(props);
    const { totalPages = null, totalRecords = null, pageLimit = 30, pageNeighbours = 0 } = props;

    this.pageLimit = typeof pageLimit === "number" ? pageLimit : 30;
    this.totalRecords = typeof totalRecords === "number" ? totalRecords : 0;
    this.totalPages = typeof totalPages === "number" ? totalPages : 0;
    // pageNeighbours can be: 0, 1 or 2
    this.pageNeighbours = typeof pageNeighbours === "number" ? Math.max(0, Math.min(pageNeighbours, 2)) : 0;

    this.totalPages = this.totalPages;

    this.state = { currentPage: 1 };
  }

  componentDidMount() {
    this.gotoPage(1);
  }

  gotoPage = (page: number) => {
    const { onPageChanged = (f: any) => f } = this.props;

    const currentPage = Math.max(0, Math.min(page, this.totalPages));

    const paginationData = {
      currentPage,
      totalPages: this.totalPages,
      pageLimit: this.pageLimit,
      totalRecords: this.totalRecords,
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  };

  handleClick = (page: any) => (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    this.gotoPage(page);
  };

  handleMoveLeft = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage - 1);
  };

  handleMoveRight = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage + 1);
  };

  /**
   * Let's say we have 10 pages and we set pageNeighbours to 2
   * Given that the current page is 6
   * The pagination control will look like the following:
   *
   * (1) < {4 5} [6] {7 8} > (10)
   *
   * (x) => terminal pages: first and last page(always visible)
   * [x] => represents current page
   * {...x} => represents page neighbours
   */
  fetchPageNumbers = (): (number | string)[] => {
    const totalPages = this.totalPages;
    const currentPage = this.state.currentPage;
    const pageNeighbours = this.pageNeighbours;

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = this.pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages: any = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  render() {
    if (!this.totalRecords || this.totalPages === 1) return null;

    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();

    return (
      <div className="pagenav">
        <ul className="pagination">
          {pages.map((page, index) => {
            if (page === LEFT_PAGE)
              return (
                <li key={index}>
                  <Link to="" aria-label="Previous" onClick={this.handleMoveLeft}>
                    <span>←</span>
                  </Link>
                </li>
              );

            if (page === RIGHT_PAGE)
              return (
                <li key={index}>
                  <Link to="" aria-label="Next" onClick={this.handleMoveRight}>
                    <span>→</span>
                  </Link>
                </li>
              );

            return (
              <li key={index} className={currentPage === page ? " active" : ""}>
                <Link to="" onClick={this.handleClick(page)}>
                  {page}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="clearfix"></div>
      </div>
    );
  }
}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func,
};

export default Pagination;
