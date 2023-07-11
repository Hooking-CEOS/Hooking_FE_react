import { DELETE } from "@/utils/axios";

export const onWithDrawal = async () => {
  await DELETE(`/user/remove`);
};
