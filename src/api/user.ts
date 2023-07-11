import { GET, POST } from "@/utils/axios";

// 유저정보 반환
export const getUserProfile = async () => {
  return await GET("/users/profile");
};

// 건의사항 작성
export const userReview = async (body: any) => {
  return await POST("/users/review", body);
};

// 내 건의사항 조회
export const getMyReview = async () => {
  return await GET("/users/review");
};
