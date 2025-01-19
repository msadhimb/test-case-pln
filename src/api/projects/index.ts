import instanceBaseUrl from '@/axios/interceptor';

export const getProjectsApi = async (params: any) => {
  const response = await instanceBaseUrl.get('projects', {
    params,
  });
  return response.data;
};
