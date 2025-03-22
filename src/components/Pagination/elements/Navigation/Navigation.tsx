export type NavigationType = "next" | "previous";
type NavProps = {
  navigation: NavigationType;
  navigatePage: (type: NavigationType) => void;
};
const Navigation: React.FC<NavProps> = ({ navigation, navigatePage }) => {
  return (
    <li
      className="pagination__item nav"
      onClick={() => navigatePage(navigation)}
    >
      {navigation == "next" ? ">" : "<"}
    </li>
  );
};

export default Navigation;
