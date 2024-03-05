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

interface FieldType {
  fields: any[];
  setField: (data: any[]) => void;
  search: boolean;
  setSearch: (value: boolean) => void;
}

export const useData = create<DataType>((set) => ({
  data: [],
  setData: (data) => set(() => ({ data: data })),
}));

export const useLoading = create<LoadingType>((set) => ({
  loading: false,
  setLoading: (arg) => set(() => ({ loading: arg })),
}));

// for the async call with state update
const fetchIds = async () => {
  useLoading.getState().setLoading(false);
  useData.getState().setData([]);
  useLoading.getState().setLoading(true);
  try {
    const res = await axiosInstance.post("/", {
      action: "get_ids",
      params: { offset: useOffset.getState().offset, limit: 50 },
    });
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

export const useFields = create<FieldType>((set) => ({
  fields: [],
  setField: (data) => set(() => ({ fields: data })),
  search: false,
  setSearch: (value) => set(() => ({ search: value })),
}));
