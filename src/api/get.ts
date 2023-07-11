import { GET } from "@/utils/axios";

export const onLogOut = async () => {
  await GET(`/user/logout`);
};
