import { useEffect } from "react";
import { isBigWindow } from "@/utils/atom";
import { useSetRecoilState } from "recoil";

/**
 * useWindowResize
 * @returns void
 * @description
 * detects window resize event
 * set the window size to recoil state
 * 0: big window, 1: desktop window, 2: mobile window
 */
const useWindowResize = () => {
  const setWindowSize = useSetRecoilState(isBigWindow);

  const BIG_WINDOW_SIZE = 1360;
  const DESKTOP_WINDOW_SIZE = 1280;

  const handleResize = () => {
    window.innerWidth > BIG_WINDOW_SIZE
      ? setWindowSize(0)
      : window.innerWidth > DESKTOP_WINDOW_SIZE
      ? setWindowSize(1)
      : setWindowSize(2);
  };

  useEffect(() => {
    window?.addEventListener("resize", handleResize);
    handleResize(); // 초깃값 설정
    return () => window.removeEventListener("resize", handleResize);
  }, []);
};

export default useWindowResize;
