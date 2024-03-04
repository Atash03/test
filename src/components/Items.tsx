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
    <div className="flex flex-col gap-[20px]">
      {items.length > 0 &&
        items.map((item: any) => (
          <div key={item.id}>
            <ul>
              <li>{item.brand}</li>
              <li>{item.product}</li>
              <li>{item.id}</li>
              <li>{item.price}</li>
            </ul>
          </div>
        ))}
    </div>
  );
};

export default Items;
