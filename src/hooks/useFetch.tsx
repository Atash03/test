import React, { useEffect } from "react";
import { axiosInstance } from "../config/axios";
import { useData, useLoading, useOffset } from "../store/store";

export const useFetch = () => {
  const { setData } = useData();
  const { setLoading } = useLoading();
  const { offset } = useOffset();

  const fetchIds = async () => {
    setLoading(false);
    setData([]);
    setLoading(true);
    try {
      const res = await axiosInstance.post("/", {
        action: "get_ids",
        params: { offset: offset, limit: 50 },
      });
      console.log(res);
      setData(res.data.result);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setTimeout(fetchIds, 5000);
    }
  };

  return { fetchIds };
};
