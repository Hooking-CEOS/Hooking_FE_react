import HookingRouter from "@/router";
import {
  brandModalOverlay,
  loginModalOverlay,
  searchModalOverlay,
} from "@/utils/atom";
import { useRecoilValue } from "recoil";
import { Suspense } from "react";
import { Z_INDEX_MODAL } from "@/utils/constants";
import styled from "styled-components";
import useWindowResize from "./hooks/useWindowResize";
import { isBigWindow } from "@/utils/atom";

const App = () => {
  const mounted = useRecoilValue(loginModalOverlay);
  const copyMounted = useRecoilValue(brandModalOverlay);
  const searchFocus = useRecoilValue(searchModalOverlay);

  useWindowResize();

  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <main className="app">
        {(mounted || copyMounted) && <div className="hovered" />}
        {searchFocus && <Overlay />}
        <HookingRouter />
      </main>
    </Suspense>
  );
};
export default App;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.6;
  z-index: ${Z_INDEX_MODAL};
`;
