import Items from "./Items";
import Pagination from "./Pagination";

const Main = () => {
  return (
    <div className="flex flex-col w-full">
      <Pagination />
      <Items />
    </div>
  );
};

export default Main;
