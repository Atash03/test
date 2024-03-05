import { useData, useFields, useOffset } from "../store/store";

const Pagination = () => {
  const { data } = useData();
  const { offset, next, prev } = useOffset();
  const { search } = useFields();

  return data.length > 0 && !search ? (
    <div className="flex space-x-[20px] items-center">
      {offset > 0 && (
        <button
          onClick={prev}
          className="border border-blue-950 px-[15px] py-[5px] rounded-md hover:bg-blue-950 hover:text-white transition-all duration-300 h-fit"
        >
          prev
        </button>
      )}
      <button
        onClick={next}
        className="border border-blue-950 px-[15px] py-[5px] rounded-md hover:bg-blue-950 hover:text-white transition-all duration-300 h-fit"
      >
        next
      </button>
    </div>
  ) : null;
};

export default Pagination;
