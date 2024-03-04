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
          params: { limit: 50 },
        });
        console.log(res);
        setData(res.data.result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchIds();
  }, []);

  return <div className="container px-[40px] sm:px-[15px]">{data.length > 0 ? <Items data={data} /> : <p>Loading...</p>}</div>;
};

export default App;
