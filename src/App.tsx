import React, { useEffect, useState } from "react";
import Items from "./components/Items";
import { axiosInstance } from "./config/axios";

const App = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchIds = async () => {
      try {
        const res = await axiosInstance.post("/", {
          action: "get_ids",
          params: { limit: 10 },
        });
        console.log(res);
        setData(res.data.result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchIds();
  }, []);

  return <div>{data.length > 0 ? <Items data={data} /> : <p>No items</p>}</div>;
};

export default App;
