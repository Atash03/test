import { create } from "zustand";
import { axiosInstance } from "../config/axios";

interface DataType {
  data: any[];
  setData: (data: any[]) => void;
}

interface LoadingType {
  loading: boolean;
  setLoading: (arg: boolean) => void;
}

interface OffsetType {
  offset: number;
  next: () => void;
  prev: () => void;
}

export const useData = create<DataType>((set) => ({
  data: [],
  setData: (data) => set(() => ({ data: data })),
}));

export const useLoading = create<LoadingType>((set) => ({
  loading: false,
  setLoading: (arg) => set(() => ({ loading: arg })),
}));

const fetchIds = async () => {
  useLoading.getState().setLoading(false);
  useData.getState().setData([]);
  useLoading.getState().setLoading(true);
  try {
    const res = await axiosInstance.post("/", {
      action: "get_ids",
      params: { offset: useOffset.getState().offset, limit: 50 },
    });
    console.log(res);
    useData.getState().setData(res.data.result);
  } catch (error) {
    console.log(error);
    useLoading.getState().setLoading(false);
    setTimeout(fetchIds, 5000);
  }
};

export const useOffset = create<OffsetType>((set) => ({
  offset: 0,
  next: async () => {
    set((state) => ({ offset: state.offset + 50 }));
    await fetchIds();
  },
  prev: async () => {
    set((state) => ({ offset: state.offset - 50 }));
    await fetchIds();
  },
}));
