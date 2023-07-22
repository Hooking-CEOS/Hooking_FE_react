import { RefObject, useEffect } from "react";

function useOutSideClick(
  ref: RefObject<HTMLElement>,
  callback: (() => void) | undefined
) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback?.();
      }
    };
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
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
