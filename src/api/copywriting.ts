import { GET, POST } from "@/utils/axios";

// 카피라이팅 필터
export const getCopyFilter = async () => {
  return await POST("/copy/filter", {});
};

// 전체 카피라이팅 조회
export const getAllCopy = async () => {
  return await GET("/copy");
};

// 카피라이팅 검색 조회
export const getCopySearch = async (keyword: string | null) => {
  return await GET(`/copy/search?keyword=${keyword}`);
};

// 카피라이팅 스크랩
export const scrapCopy = async (body: any) => {
  return await POST("/scrap", body);
};

// 스크랩한 카피라이팅 조회
export const userReview = async () => {
  return await GET("/copy/scrap");
};
