import { useFetch } from "../hooks/useFetch";
import { useData, useOffset } from "../store/store";

const Pagination = () => {
  const { data } = useData();
  const { offset, next, prev } = useOffset();

  return data.length > 0 ? (
    <div className="my-[30px] flex justify-end w-full space-x-[30px]">
      {offset > 0 && (
        <button
          onClick={prev}
          className="border border-blue-950 px-[15px] py-[5px] rounded-md hover:bg-blue-950 hover:text-white transition-all duration-300"
        >
          prev
        </button>
      )}
      <button
        onClick={next}
        className="border border-blue-950 px-[15px] py-[5px] rounded-md hover:bg-blue-950 hover:text-white transition-all duration-300"
      >
        next
      </button>
    </div>
  ) : null;
};

export default Pagination;
