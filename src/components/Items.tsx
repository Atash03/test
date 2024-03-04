import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axios";

const Items = ({ data }: { data: any[] }) => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.post("/", {
          action: "get_items",
          params: { ids: data },
        });
        console.log(res);
        setItems(res.data.result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const arr = [];
    const seen = new Map();
    items.forEach((item) => {
      if (!seen.has(item.id)) {
        seen.set(item.id, item);
      }
    });
    for (let i of seen.values()) {
      arr.push(i);
    }
    setItems(arr);
  }, [items.length]);

  return (
    <div className="grid grid-cols-3 gap-[20px] my-[40px]">
      {items.length > 0 &&
        items.map((item: any) => (
          <div
            key={item.id}
            className="border border-blue-900 p-[20px] rounded-xl flex items-center"
          >
            <ul>
              {item.brand && <li><span className="font-[800]">Brand: </span>{item.brand}</li>}
              <li><span className="font-[800]">Product: </span>{item.product}</li>
              <li><span className="font-[800]">Id: </span>{item.id}</li>
              <li><span className="font-[800]">Price: </span>{item.price}</li>
            </ul>
          </div>
        ))}
    </div>
  );
};

export default Items;
