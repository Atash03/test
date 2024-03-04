import React, { useEffect, useState } from "react";
import Items from "./components/Items";
import Main from "./components/Main";
import { axiosInstance } from "./config/axios";
import { useFetch } from "./hooks/useFetch";
import { useData, useLoading, useOffset } from "./store/store";

const App = () => {
  const { data } = useData();
  const { loading } = useLoading();
  const { fetchIds } = useFetch();

  useEffect(() => {
    fetchIds();
  }, []);

  return (
    <div className="container flex justify-center px-[40px] sm:px-[15px]">
      {loading ? (
        data.length > 0 ? (
          <Main />
        ) : (
          <p>Loading...</p>
        )
      ) : (
        <div>Error</div>
      )}
    </div>
  );
};

export default App;
