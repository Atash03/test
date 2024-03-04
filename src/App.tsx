import React, { useEffect, useState } from "react";
import Items from "./components/Items";
import { axiosInstance } from "./config/axios";

const App = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchIds = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.post("/", {
          action: "get_ids",
          params: { offset: 0, limit: 50 },
        });
        console.log(res);
        setData(res.data.result);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setTimeout(fetchIds, 5000);
      }
    };

    fetchIds();
  }, []);

  return <div className="container px-[40px] sm:px-[15px]">{loading ? data.length > 0 ? <Items data={data} /> : <p>Loading...</p> : <div>Error</div>}</div>;
};

export default App;
