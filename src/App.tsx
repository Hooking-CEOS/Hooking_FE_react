import HookingRouter from "@/router";
import { loginModalOverlay } from "@/utils/atom";
import { useRecoilValue } from "recoil";
import { Suspense } from "react";

const App = () => {
  const mounted = useRecoilValue(loginModalOverlay);

  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <main className="app">
        {mounted && <div className="hovered" />}
        <HookingRouter />
      </main>
    </Suspense>
  );
};
export default App;
