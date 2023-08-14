import { RefObject, useEffect } from "react";
import { RecoilState } from "recoil";

function useOutSideClick(
  ref: RefObject<HTMLElement>,
  callback: (() => void) | undefined,
  isOpen: RecoilState<boolean> | boolean
) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // ref가 달린 DOM이 열린 상태인 경우에만 로직 실행
      // 기존에는 DOM이 렌더링되면 실행되었음

      if (
        isOpen &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        callback?.();
      }
    };
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isOpen && event.key === "Escape") {
        callback?.();
      }
    };

    window.addEventListener("mousedown", handleClick);
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [ref, callback]);
}

export default useOutSideClick;
