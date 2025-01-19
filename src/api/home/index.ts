import instanceBaseUrl from '@/axios/interceptor';

export const getUsersApi = async () => {
  const response = await instanceBaseUrl.get('users');
  return response.data;
};

export const postUserApi = async (data: any) => {
  const response = await instanceBaseUrl.post('users', data);
  return response.data;
};
