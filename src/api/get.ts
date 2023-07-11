import { GET } from "@/utils/axios";


export const onLogOut = async () => {
  await GET(`/user/logout`);

export const getSearchResult = async (keyword: string) => {
  const data = await GET("/copy/search", { keyword: keyword });
  console.log(data, data);
  return data;

};
