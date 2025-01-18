import { getWorklogApi } from '@/api/detail';
import { getUsersApi } from '@/api/home';
import { create } from 'zustand';

interface StoreState {
  dataUser: any;
  dataWorklog: any;
  getDataUser: () => Promise<void>;
  getWorklog: () => Promise<void>;
}

const useHome = create<StoreState>((set) => ({
  dataUser: [],
  dataWorklog: [],
  getDataUser: async () => {
    const res = await getUsersApi();
    set({ dataUser: res });
  },
  getWorklog: async () => {
    const res = await getWorklogApi();
    set({ dataWorklog: res });
  },
}));

export default useHome;
