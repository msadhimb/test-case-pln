import {
  deleteWorklogApi,
  getDashboardApi,
  getOptionsApi,
  postWorklogApi,
} from '@/api/detail';
import { toast } from 'react-toastify';
import { create } from 'zustand';

interface UseDetailInterface {
  dataOptions: any[];
  dataDashboard: any[];
  getDataOptions: () => Promise<void>;
  postWorklogData: (data: any) => Promise<any>;
  deleteWorklogData: (id: number) => Promise<any>;
  getDashboarData: (params: any) => Promise<any>;
}

const useDetail = create<UseDetailInterface>((set) => ({
  dataOptions: [],
  dataDashboard: [],
  getDataOptions: async () => {
    const res = await getOptionsApi();
    set({ dataOptions: res });
  },
  postWorklogData: async (data: any) => {
    const toastId = toast.loading('Processing request...');
    try {
      const res = await postWorklogApi(data);
      toast.update(toastId, {
        render: 'Worklog submitted successfully.',
        type: 'success',
        isLoading: false,
        autoClose: 3000, // Toast will close after 3 seconds
      });
      return res;
    } catch (error) {
      console.error(error);
      toast.update(toastId, {
        render: 'Failed to submit worklog. Please try again.',
        type: 'error',
        isLoading: false,
        autoClose: 3000, // Toast will close after 3 seconds
      });
    }
  },
  deleteWorklogData: async (id: number) => {
    const toastId = toast.loading('Processing request...');
    try {
      const res = await deleteWorklogApi(id);
      toast.update(toastId, {
        render: 'Worklog deleted successfully.',
        type: 'success',
        isLoading: false,
        autoClose: 3000, // Toast will close after 3 seconds
      });
      return res;
    } catch (error) {
      console.error(error);
      toast.update(toastId, {
        render: 'Failed to delete worklog. Please try again.',
        type: 'error',
        isLoading: false,
        autoClose: 3000, // Toast will close after 3 seconds
      });
    }
  },
  getDashboarData: async (params: any) => {
    const res = await getDashboardApi(params);
    set({ dataDashboard: res });
  },
}));

export default useDetail;
