type PaginateItemProp = {
  isActive: Boolean;
  index: number;
  currentPageChange: (currentPage: number) => void;
};
const PaginationItem: React.FC<PaginateItemProp> = ({
  isActive,
  index,
  currentPageChange,
}) => {
  return (
    <li
      className={`${isActive ? "active " : ""}pagination__item`}
      key={index}
      onClick={() => currentPageChange(index)}
    >
      {index}
    </li>
  );
};
export default PaginationItem;
