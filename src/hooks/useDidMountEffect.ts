import { useEffect, useRef } from "react";

// 컴포넌트가 첫렌더링 때는 실행 안되고 마운트 이후 의존성 값이 바뀌었을 때만 실행됨
const useDidMountEffect = (func: any, deps: any) => {
  const document = useRef<boolean>(false); // 값 보관

  useEffect(() => {
    if (document.current) {
      func();
    } else {
      document.current = true; // 처음에 렌더링될 때는 false이므로
    }
  }, deps);
};

export default useDidMountEffect;
