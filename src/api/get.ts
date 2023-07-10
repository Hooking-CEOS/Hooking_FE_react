import { GET } from "@/utils/axios";

export const getSearchResult = async (keyword: string) => {
  const data = await GET("/copy/search", { keyword: keyword });
  console.log(data, data);
  return data;
};
