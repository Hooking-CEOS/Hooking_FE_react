import { GET, POST, DELETE } from "@/utils/axios";

// 유저정보 조회
export const getInformation = async () => {
  return await GET("/information");
};

// 유저정보 반환 -> v1
// export const getUserProfile = async () => {
//   return await GET("/users/profile");
// };

// export const onLogin = async (body: any) => {
//   await POST(`/user/login`, body);
// };

// 건의사항 작성
// export const userReview = async (body: any) => {
//   return await POST("/users/review", body);
// };

// 내 건의사항 조회
// export const getMyReview = async () => {
//   return await GET("/users/review");
// };

// export const onWithDrawal = async () => {
//   await DELETE(`/user/remove`);
// };

// export const onLogOut = async () => {
//   await GET(`/user/logout`);
// };
