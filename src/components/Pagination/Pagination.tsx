import { ChangeEvent } from "react";
import { PaginationType } from "../../App";
import Navigation from "./elements/Navigation";
import { NavigationType } from "./elements/Navigation/Navigation";
import PaginationItem from "./elements/PaginationItem";

type PaginationProps = {
  pagination: PaginationType;
  handlePageChange: (
    cb: (
      setPagination: React.Dispatch<React.SetStateAction<PaginationType>>
    ) => void
  ) => void;
};

const pageSelector: number[] = [5, 10, 20, 25, 50, 100];
const MAX_ELEMENT_PAGE: number = 7;

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  handlePageChange,
}) => {
  const { currentPage, totalPage, itemPerPage } = pagination;

  function currentPageChange(currentPage: number) {
    handlePageChange((setPagination) => {
      setPagination((pagination) => ({
        ...pagination,
        currentPage: currentPage,
      }));
    });
  }

  function itemPerPageChange(e: ChangeEvent<HTMLSelectElement>) {
    handlePageChange((setPagination) => {
      setPagination((pagination) => {
        const itemPerPage = Number(e.target.value);
        const totalPage = Math.ceil((pagination.totalItem + 1) / pagination.itemPerPage);

        return {
          ...pagination,
          currentPage: 0,
          totalPage,
          itemPerPage,
        };
      });
    });
  }

  function navigatePage(type: NavigationType) {
    handlePageChange((setPagination) => {
      setPagination((pagination) => {
        let currentPage =
          type === "next"
            ? pagination.currentPage + 1
            : pagination.currentPage - 1;

        if (currentPage < 0) {
          currentPage = pagination.totalPage - 1;
        }

        if (currentPage >= pagination.totalPage) {
          currentPage = 0;
        }

        return { ...pagination, currentPage };
      });
    });
  }

  return (
    <div className="pagination-section">
      <ul className="pagination">
        <Navigation navigatePage={navigatePage} navigation="previous" />
        {Array.from(
          {
            length: totalPage < MAX_ELEMENT_PAGE ? totalPage : MAX_ELEMENT_PAGE,
          },
          (v, i) => i
        ).map((index) => {
          if (totalPage < MAX_ELEMENT_PAGE) {
            return (
              <PaginationItem
                currentPageChange={currentPageChange}
                isActive={currentPage === index}
                index={index}
              />
            );
          }
          const pivot = Math.floor(MAX_ELEMENT_PAGE / 2);

          const isGreaterThanPivot = currentPage > pivot;
          const isLessThanPivot = currentPage < totalPage - 1 - pivot ;

          if (
            (isGreaterThanPivot && index === 1) ||
            (isLessThanPivot && index === MAX_ELEMENT_PAGE - 2)
          ) {
            return (
              <li className={`pagination__item`} key={index}>
                ...
              </li>
            );
          }

          if (index == 0) {
            return (
              <PaginationItem
                currentPageChange={currentPageChange}
                isActive={currentPage === 0}
                index={0}
              />
            );
          }

          if (isGreaterThanPivot && isLessThanPivot && index == 2) {
            return (
              <li
                className="pagination__item"
                key={index}
                onClick={() => currentPageChange(currentPage - 1)}
              >
                {currentPage - 1}
              </li>
            );
          }
          if (isGreaterThanPivot && isLessThanPivot && index == 3) {
            return (
              <li
                className="active pagination__item"
                key={index}
                onClick={() => currentPageChange(currentPage)}
              >
                {currentPage}
              </li>
            );
          }
          if (isGreaterThanPivot && isLessThanPivot && index == 4) {
            return (
              <li
                className="pagination__item"
                key={index}
                onClick={() => currentPageChange(currentPage + 1)}
              >
                {currentPage + 1}
              </li>
            );
          }

          if (index == 6) {
            return (
              <PaginationItem
                currentPageChange={currentPageChange}
                isActive={currentPage === totalPage - 1}
                index={totalPage - 1}
              />
            );
          }

          if (currentPage >= totalPage - 1 - pivot) {
            const idx = totalPage - MAX_ELEMENT_PAGE + index;
            return (
              <PaginationItem
                currentPageChange={currentPageChange}
                isActive={currentPage === idx}
                index={idx}
              />
            );
          }

          return (
            <PaginationItem
              currentPageChange={currentPageChange}
              isActive={currentPage === index}
              index={index}
            />
          );
        })}
        <Navigation navigatePage={navigatePage} navigation="next" />
      </ul>
      <select
        className="item-per-page"
        name=""
        id=""
        onChange={(e) => itemPerPageChange(e)}
      >
        {pageSelector.map((item) => (
          <option value={item} selected={itemPerPage === item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
