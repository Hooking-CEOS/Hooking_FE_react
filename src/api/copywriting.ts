import { GET, POST } from "@/utils/axios";

// 카피라이팅 필터
export const getCopyFilter = async (params: any, pageNum: number = 0) => {
  return await GET(`/copy/filter/${pageNum}`, {
    params: params,
  });
};

// 전체 카피라이팅 조회
export const getAllCopy = async (pageNum: number = 0) => {
  return await GET(`/copy/${pageNum}`);
};

// 카피라이팅 검색 조회
export const getCopySearch = async (
  keyword: string | null,
  pageNum: number = 0
) => {
  return await GET(`/copy/search/${pageNum}?keyword=${keyword}`);
};

// 카피라이팅 스크랩
export const scrapCopy = async (body: { cardId: number }) => {
  return await POST(`/copy/scrap/`, body);
};

// 스크랩한 카피라이팅 조회
export const getScrapCopy = async (pageNum: number = 0) => {
  return await GET(`/copy/scrap/${pageNum}`);
};
