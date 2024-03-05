import { useEffect } from "react";
import Main from "./components/Main";
import { useFetch } from "./hooks/useFetch";
import { useData, useLoading, useOffset } from "./store/store";

const App = () => {
  const { data } = useData();
  const { loading } = useLoading();
  const { offset } = useOffset();
  const { fetchIds } = useFetch();

  // initial fetch
  useEffect(() => {
    fetchIds({
      action: "get_ids",
      params: { offset: offset, limit: 50 },
    });
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
        <div>Error occured, please wait...</div>
      )}
    </div>
  );
};

export default App;
