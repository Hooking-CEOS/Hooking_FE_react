import { useRef } from "react";

const useScrollIntoView = () => {
  const element = useRef<HTMLDivElement>(null);

  const onScrollToElement = () => {
    element.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return { element, onScrollToElement };
};

export default useScrollIntoView;
