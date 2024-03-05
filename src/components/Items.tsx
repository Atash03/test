import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axios";
import { useData } from "../store/store";

const Items = () => {
  const { data } = useData();
  const [items, setItems] = useState<any[]>([]);

  // fetching actual information of products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.post("/", {
          action: "get_items",
          params: { ids: data },
        });
        // filtering duplication of ids
        const uniqueItems = res.data.result.reduce((acc: any[], item: any) => {
          if (!acc.some((i: any) => i.id === item.id)) {
            acc.push(item);
          }
          return acc;
        }, []);
        setItems(uniqueItems);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] mb-[40px]">
      {items.length > 0 &&
        items.map((item: any) => (
          <div
            key={item.id}
            className="border border-blue-900 p-[20px] rounded-xl flex items-center"
          >
            <ul>
              {item.brand && (
                <li>
                  <span className="font-[800]">Brand: </span>
                  {item.brand}
                </li>
              )}
              <li>
                <span className="font-[800]">Product: </span>
                {item.product}
              </li>
              <li>
                <span className="font-[800]">Id: </span>
                {item.id}
              </li>
              <li>
                <span className="font-[800]">Price: </span>
                {item.price}$
              </li>
            </ul>
          </div>
        ))}
    </div>
  );
};

export default Items;
