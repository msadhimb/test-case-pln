import instanceBaseUrl from '@/axios/interceptor';

export const getWorklogApi = async () => {
  const response = await instanceBaseUrl.get('worklog');
  return response.data;
};
