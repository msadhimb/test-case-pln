import { getOptionsApi, getWorklogApi } from "@/api/detail";
import { create } from "zustand";

interface UseDetailInterface {
  dataOptions: any[];
  getDataOptions: () => Promise<void>;
}

const useDetail = create<UseDetailInterface>((set) => ({
  dataOptions: [],
  getDataOptions: async () => {
    const res = await getOptionsApi();
    set({ dataOptions: res });
  },
}));

export default useDetail;
