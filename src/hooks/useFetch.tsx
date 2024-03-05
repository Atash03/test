import { axiosInstance } from "../config/axios";
import { useData, useLoading } from "../store/store";

export const useFetch = () => {
  const { setData } = useData();
  const { setLoading } = useLoading();

  const fetchIds = async (body: any) => {
    setLoading(false);
    setData([]);
    setLoading(true);
    try {
      const res = await axiosInstance.post("/", body);
      setData(res.data.result);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setTimeout(fetchIds, 5000);
    }
  };

  return { fetchIds };
};
