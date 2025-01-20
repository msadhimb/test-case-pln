import instanceBaseUrl from "@/axios/interceptor";

export const getWorklogApi = async (params: any) => {
  const response = await instanceBaseUrl.get("worklog", {
    params,
  });
  return response.data;
};

export const getOptionsApi = async () => {
  const response = await instanceBaseUrl.get("options");
  return response.data;
};
