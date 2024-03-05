import { useData } from "../store/store";
import Filter from "./Filter";
import Items from "./Items";
import Pagination from "./Pagination";

const Main = () => {
  const { data } = useData();
  
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full justify-between sm:flex-row my-[30px] space-y-[20px] sm:space-y-0">
        {data.length > 0 && <Filter />}
        <Pagination />
      </div>
      <Items />
    </div>
  );
};

export default Main;
