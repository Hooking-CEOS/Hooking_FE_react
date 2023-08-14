import { useEffect } from "react";
import { isBigWindow } from "@/utils/atom";
import { useSetRecoilState } from "recoil";

const useWindowResize = () => {
  const setWindowSize = useSetRecoilState(isBigWindow);

  const BIG_WINDOW_SIZE = 1360;

  const handleResize = () => {
    window.innerWidth > BIG_WINDOW_SIZE
      ? setWindowSize(true)
      : setWindowSize(false);
  };

  useEffect(() => {
    window?.addEventListener("resize", handleResize);
    handleResize(); // 초깃값 설정
    return () => window.removeEventListener("resize", handleResize);
  }, []);
};

export default useWindowResize;
