import { useEffect, useState, useTransition } from "react";
import Pagination from "./components/Pagination";
import Card from "./components/Card";
import { MockData, promise, mocks } from "./mocks";

import "./styles.css";
import Loading from "./components/Loading";
export type PaginationType = {
  currentPage: number;
  totalPage: number;
  itemPerPage: number;
  totalItem: number
};

export default function App() {
  const [data, setData] = useState<Array<MockData>>([]);
  const [isLoading, setIsLoading] = useState<Boolean>();
  const [pagination, setPagination] = useState<PaginationType>({
    currentPage: 0,
    totalPage: 0,
    itemPerPage: 10,
    totalItem: 0,
  });

  function handlePageChange(
    cb: (
      setPagination: React.Dispatch<React.SetStateAction<PaginationType>>
    ) => void
  ): void {
    cb(setPagination);
  }

  async function fetchData() {
    setIsLoading(true);
    const { currentPage, itemPerPage } = pagination;
    const start = currentPage * itemPerPage;
    const end = start + itemPerPage + 1;
    const result = await promise();

    const data = result.slice(start, end);

    setPagination((pagination) => {
      const totalPage = Math.ceil((pagination.totalItem + 1) / pagination.itemPerPage);
      return {
        ...pagination,
        totalItem: result.length,
        totalPage,
      };
    });

    setData(data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [pagination.itemPerPage, pagination.currentPage]);

  if (isLoading && data.length === 0) return <Loading/>;

  return (
    <div className="App">
      <div className="content">
        <h1 className="content__header" >Hello CodeSandbox</h1>

        <div className="main">
          {isLoading && <Loading/>}
          {data.length > 0 && !isLoading &&
            data.map((item) => {
              return <Card cardData={item} key={item.header} />;
            })}
        </div>
      </div>

      <Pagination
        pagination={pagination}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}
