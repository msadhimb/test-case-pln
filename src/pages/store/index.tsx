import { getWorklogApi } from '@/api/detail';
import { getUsersApi, postUserApi } from '@/api/home';
import { create } from 'zustand';

interface StoreState {
  dataUser: any;
  dataWorklog: any;
  dataProjects: any;
  getDataUser: () => Promise<void>;
  getWorklog: (param: any) => Promise<void>;
  getProjects: (param: any) => Promise<void>;
  postUserData: (data: any) => Promise<any>;
}

const useHome = create<StoreState>((set) => ({
  dataUser: [],
  dataWorklog: [],
  dataProjects: [],
  getDataUser: async () => {
    const res = await getUsersApi();
    set({ dataUser: res });
  },
  getWorklog: async (param: any) => {
    const res = await getWorklogApi(param);
    set({ dataWorklog: res });
  },
  getProjects: async (param: any) => {
    const res = await getWorklogApi(param);
    set({ dataProjects: res });
  },
  postUserData: async (data: any) => {
    const res = await postUserApi(data);
    return res;
  },
}));

export default useHome;
