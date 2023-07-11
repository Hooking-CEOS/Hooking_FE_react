import { POST } from "@/utils/axios";

export const onLogin = async (body: any) => {
  await POST(`/user/login`, body);
};
