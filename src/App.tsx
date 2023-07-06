import HookingRouter from "@/router";
import { loginModalOverlay } from "@/utils/atom";
import { useRecoilValue } from "recoil";

const App = () => {
  const mounted = useRecoilValue(loginModalOverlay);

  return (
    <main className="app">
      {mounted && <div className="hovered" />}
      <HookingRouter />
    </main>
  );
};
export default App;
