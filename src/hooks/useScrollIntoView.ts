import { useRef } from "react";

type ScrollBehavior = "auto" | "smooth" | undefined;

const useScrollIntoView = (behavior: ScrollBehavior = "smooth") => {
  const element = useRef<HTMLDivElement>(null);

  const onScrollToElement = () => {
    element.current?.scrollIntoView({ behavior: behavior, block: "start" });
  };

  return { element, onScrollToElement };
};

export default useScrollIntoView;
