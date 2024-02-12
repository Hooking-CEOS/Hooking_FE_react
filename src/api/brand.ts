import { GET, POST } from "@/utils/axios";

// 브랜드 기본정보 조회
export const getBrandDefault = async (pageNum: number = 0) => {
  return await GET(`/api/v2/brand/${pageNum}`);
};

// // 브랜드 기본정보 조회 v1
// export const getBrandDefault = async (pageNum: number = 0) => {
//   return await GET(`/brand/${pageNum}`);
// };

// 브랜드 상세정보 조회
export const getBrandDetail = async (brandId: any, pageNum: number = 0) => {
  return await GET(`/api/v2/brand/${brandId}/${pageNum}`);
};

// 브랜드 상세정보 조회 v1
// export const getBrandDetail = async (brandId: any, pageNum: number = 0) => {
//   return await GET(`/brand/${brandId}/${pageNum}`);
// };
