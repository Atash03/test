import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "../config/axios";
import { useFetch } from "../hooks/useFetch";
import { useFields, useLoading } from "../store/store";

const Filter = () => {
  const { fields, setField } = useFields();
  const { loading, setLoading } = useLoading();

  //   fetching fields to filter by
  useEffect(() => {
    const fetchFields = async () => {
      setLoading(false);
      setField([]);
      setLoading(true);
      try {
        const res = await axiosInstance.post("/", {
          action: "get_fields",
        });
        setField(res.data.result);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setTimeout(fetchFields, 5000);
      }
    };

    fetchFields();
  }, []);

  return (
    <div className="flex space-x-[30px] items-center">
      <p>Filter:</p>
      {loading ? (
        fields.length > 0 ? (
          <FilterItem fields={fields} />
        ) : (
          <span>...</span>
        )
      ) : (
        <span>wait</span>
      )}
    </div>
  );
};

const FilterItem = ({ fields }: { fields: any[] }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(fields[1]);
  const [filter, setFilter] = useState<string>();
  const { fetchIds } = useFetch();
  const { setSearch } = useFields();

  //   selecting the field to filter by
  const changeSelected = useCallback((item: string) => {
    setSelected(item);
    setOpen(false);
  }, []);

  //   search for the result of filter
  const search = () => {
    fetchIds({
      action: "filter",
      params: { [selected]: selected !== "price" ? filter : Number(filter) },
    });
    setSearch(true);
  };

  return (
    <div className="flex justify-between w-full items-center space-x-[20px]">
      <div className="space-y-[10px] flex flex-col justify-end relative min-h-[60px]">
        <div className="h-fit outline-none absolute top-0 bg-gray-300 min-w-[100px] rounded-md flex flex-col">
          <span
            onClick={() => setOpen(!open)}
            className="cursor-pointer w-full text-center hover:bg-gray-400 rounded-md"
          >
            By {selected}
          </span>
          {open &&
            fields.map(
              (item, i) =>
                item !== selected && (
                  <span
                    key={i}
                    onClick={() => changeSelected(item)}
                    className="cursor-pointer w-full text-center hover:bg-gray-400 rounded-md"
                  >
                    By {item}
                  </span>
                )
            )}
        </div>
        <input
          type={selected !== "price" ? "text" : "number"}
          className="border border-blue-900 rounded-md px-[5px]"
          onChange={(e) => setFilter(e.target.value)}
          placeholder={filter}
        />
      </div>
      <button
        onClick={search}
        className="px-[10px] py-[5px] bg-blue-900 hover:bg-white border hover:border-blue-900 rounded-md h-fit text-white hover:text-black transition-all duration-300"
      >
        Search
      </button>
    </div>
  );
};

export default Filter;
