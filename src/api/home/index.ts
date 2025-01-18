import instanceBaseUrl from '@/axios/interceptor';

export const getUsersApi = async () => {
  const response = await instanceBaseUrl.get('users');
  return response.data;
};
